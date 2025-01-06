'use strict';

import { QueryInterface } from "sequelize";
import Access_Profiles from "../models/Access_Profiles.js";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";


/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Access_Profiles.tableName,[{      
      id:Access_Profiles.DEFAULT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'DEFAULT',
      allow_access_to_all_module_routines:0
    },{      
      id:Access_Profiles.ADMINISTRATIVE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'ADMINISTRATIVE',
      allow_access_to_all_module_routines:0
    },{      
      id:Access_Profiles.GERENCIAL,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'GERENCIAL',
      allow_access_to_all_module_routines:0
    },{      
      id:Access_Profiles.INVOICING,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'INVOICING',
      allow_access_to_all_module_routines:0
    },{      
      id:Access_Profiles.FINANCIAL,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'FINANCIAL',
      allow_access_to_all_module_routines:0
    },{      
      id:Access_Profiles.SUPERVISOR,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SUPERVISOR',
      allow_access_to_all_module_routines:0
    },{      
      id:Access_Profiles.HUMAN_RESOURCES,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'HUMAN_RESOURCES',
      allow_access_to_all_module_routines:0
    },{      
      id:Access_Profiles.SELLER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SELLER',
      allow_access_to_all_module_routines:0
    },{      
      id:Access_Profiles.SUPLIER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SUPLIER',
      allow_access_to_all_module_routines:0
    }],{
      ignoreDuplicates:true
    }); 
     
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Access_Profiles.tableName, {});
  }
};
