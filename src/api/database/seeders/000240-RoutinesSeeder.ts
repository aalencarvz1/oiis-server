'use strict';

import { QueryInterface } from "sequelize";
import Utils from "../../controllers/utils/Utils.js";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";
import Modules from "../models/Modules.js";
import Routines from "../models/Routines.js";
import modules from "../catalogs/modules.js";


/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface, Sequelize: any) {    

    let registersModules : any[] = [];
    let registersRoutines : any[] = [];


    function seedRoutine(routine: any,idModuleSup?:number,idRoutineSup?:number) : void {
      try {
        if (Utils.typeOf(routine) == 'array') {          
          for(let i = 0; i < routine.length; i++) {
            seedRoutine(routine[i],idModuleSup);
          }
        } else {
          if (Utils.hasValue(routine?.subs)) {
            if (routine.routine_type_id || routine.view_path) {
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
        Utils.logError(e);
      }
    }

    seedRoutine(modules);
    await queryInterface.bulkInsert(Modules.tableName,registersModules,{
      ignoreDuplicates:true,
      updateOnDuplicate:['status_reg_id','parent_id','name','icon']
    });  

    await queryInterface.bulkInsert(Routines.tableName,registersRoutines,{
      ignoreDuplicates:true,
      updateOnDuplicate:['status_reg_id','module_id','parent_id','name','icon','view_path']
    });  
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Routines.tableName, {});
     await queryInterface.bulkDelete(Modules.tableName, {});
  }
};
