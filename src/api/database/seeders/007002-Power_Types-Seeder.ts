'use strict';

import { QueryInterface } from "sequelize";
import Power_Types from "../models/Power_Types.js";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";


/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Power_Types.tableName,[{      
      id:Power_Types.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM'
    },{      
      id:Power_Types.ACCESS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name: 'ACCESS',
    }],{
      ignoreDuplicates:true
    });  
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Power_Types.tableName, {});
  }
};
