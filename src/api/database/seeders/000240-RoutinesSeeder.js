'use strict';

const { Routines } = require('../models/Routines');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const modules = require('../catalogs/modules.json');
const { Modules } = require('../models/Modules');
const { Utils } = require('../../controllers/utils/Utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    

    let registersModules = [];
    let registersRoutines = [];


    function seedRoutine(routine,idModuleSup,idRoutineSup) {
      try {
        if (Utils.typeOf(routine) == 'array') {          
          for(let i = 0; i < routine.length; i++) {
            seedRoutine(routine[i],idModuleSup);
          }
        } else {
          Utils.log('FL','passing routine ',routine.name);
          if (Utils.hasValue(routine?.subs)) {
            Utils.log('FL',routine.name,' has subs');
            if (routine.routine_type_id || routine.view_path) {
              Utils.log('FL',routine.name,' is routine');
              registersRoutines.push({
                id:routine.id-0,
                status_reg_id: Record_Status.ACTIVE,
                creator_user_id : Users.SYSTEM,
                created_at: new Date(),
                data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
                is_sys_rec : 1,
                module_id: idModuleSup,
                parent_id: idRoutineSup,
                routine_type_id : (Utils.firstValid([routine.routine_type_id,1]))-0,
                name:routine.name,
                icon:routine.icon,
                view_path:routine.view_path,
                numeric_order: routine.numeric_order,
                show_in_menu: Utils.firstValid([routine.show_in_menu,1]),
              });
              for(let i = 0; i < routine.subs.length; i++) {
                seedRoutine(routine.subs[i],idModuleSup,routine.id);
              } 
            } else {
              Utils.log('FL',routine.name,' is module');
              registersModules.push({
                id:routine.id-0,
                status_reg_id: Record_Status.ACTIVE,
                creator_user_id : Users.SYSTEM,
                created_at: new Date(),
                data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
                is_sys_rec : 1,
                parent_id: idModuleSup,
                name:routine.name,
                numeric_order: routine.numeric_order,
                icon:routine.icon
              });

              for(let i = 0; i < routine.subs.length; i++) {
                seedRoutine(routine.subs[i],routine.id);
              } 
            }

          } else {
            Utils.log('FL',routine.name,' no has subs');
            registersRoutines.push({
              id:routine.id-0,
              status_reg_id: Record_Status.ACTIVE,
              creator_user_id : Users.SYSTEM,
              created_at: new Date(),
              data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
              is_sys_rec : 1,
              module_id: idModuleSup,
              parent_id: idRoutineSup,
              routine_type_id : routine.routine_type_id-0,
              name:routine.name,
              icon:routine.icon,
              view_path:routine.view_path,
              numeric_order: routine.numeric_order,
              show_in_menu: Utils.firstValid([routine.show_in_menu,1]),
            });
          }
        }
      } catch(e) {
        Utils.log(e);
      }
    }

    seedRoutine(modules,null);
    //Utils.log('FL',registersModules);
    //Utils.log('FL',registersRoutines);

    await queryInterface.bulkInsert(Modules.tableName,registersModules,{
      ignoreDuplicates:true,
      updateOnDuplicate:['status_reg_id','parent_id','name','icon']
    });  

    await queryInterface.bulkInsert(Routines.tableName,registersRoutines,{
      ignoreDuplicates:true,
      updateOnDuplicate:['status_reg_id','module_id','name','icon','view_path']
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Routines.tableName, null, {});
     await queryInterface.bulkDelete(Modules.tableName, null, {});
  }
};
