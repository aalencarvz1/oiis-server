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
          if (Utils.hasValue(routine?.SUBS)) {
            Utils.log('FL',routine.name,' has subs');
            if (routine.IDROUTINETYPE || routine.VIEWPATH) {
              Utils.log('FL',routine.name,' is routine');
              registersRoutines.push({
                id:routine.id-0,
                status_reg_id: Record_Status.ACTIVE,
                creator_user_id : Users.SYSTEM,
                created_at: new Date(),
                data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
                is_sys_rec : 1,
                IDMODULE: idModuleSup,
                IDSUP: idRoutineSup,
                IDROUTINETYPE : (Utils.firstValid([routine.IDROUTINETYPE,1]))-0,
                name:routine.name,
                ICON:routine.ICON,
                VIEWPATH:routine.VIEWPATH,
                ORDERNUM: routine.ORDERNUM,
                SHOWINMENU: Utils.firstValid([routine.SHOWINMENU,1]),
              });
              for(let i = 0; i < routine.SUBS.length; i++) {
                seedRoutine(routine.SUBS[i],idModuleSup,routine.id);
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
                IDSUP: idModuleSup,
                name:routine.name,
                ORDERNUM: routine.ORDERNUM,
                ICON:routine.ICON
              });

              for(let i = 0; i < routine.SUBS.length; i++) {
                seedRoutine(routine.SUBS[i],routine.id);
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
              IDMODULE: idModuleSup,
              IDSUP: idRoutineSup,
              IDROUTINETYPE : routine.IDROUTINETYPE-0,
              name:routine.name,
              ICON:routine.ICON,
              VIEWPATH:routine.VIEWPATH,
              ORDERNUM: routine.ORDERNUM,
              SHOWINMENU: Utils.firstValid([routine.SHOWINMENU,1]),
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
      updateOnDuplicate:['status_reg_id','IDSUP','name','ICON']
    });  

    await queryInterface.bulkInsert(Routines.tableName,registersRoutines,{
      ignoreDuplicates:true,
      updateOnDuplicate:['status_reg_id','IDMODULE','name','ICON','VIEWPATH']
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Routines.tableName, null, {});
     await queryInterface.bulkDelete(Modules.tableName, null, {});
  }
};
