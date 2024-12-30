'use strict';

import { QueryInterface } from "sequelize";
import Permissions from "../models/Permissions.js";
import Users from "../models/Users.js";
import Record_Status from "../models/Record_Status.js";
import Data_Origins from "../models/Data_Origins.js";
import Power_Types from "../models/Power_Types.js";
import Access_Profiles from "../models/Access_Profiles.js";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Permissions.tableName,[{      
      id:Users.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      power_type_id: Power_Types.SYSTEM,
      access_profile_id: Access_Profiles.SYSTEM,
      allowed_access: 1,
      allowed_search: 1,
      allowed_read: 1,
      allowed_update: 1,
      allowed_create: 1,
      allowed_delete: 1
    }],{
      ignoreDuplicates:true
    });  
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Permissions.tableName, {});
  }
};
