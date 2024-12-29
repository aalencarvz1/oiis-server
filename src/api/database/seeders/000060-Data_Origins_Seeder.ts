'use strict';

import { QueryInterface } from "sequelize";
import Data_Origins from "../models/Data_Origins.js";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";


/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Data_Origins.tableName,[{
      id: Data_Origins.WINTHOR,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'WINTHOR'      
    },{
      id: Data_Origins.AURORA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'AURORA'      
    },{
      id: Data_Origins.EP,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'EP'      
    },{
      id: Data_Origins.CONSULTA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CONSULTA'      
    },{
      id: Data_Origins.APP_COLLECTOR,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'APP_COLLECTOR'      
    },{
      id: Data_Origins.APP_DELIVERY,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'APP_DELIVERY'      
    }],{
      ignoreDuplicates:true
    });  
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Data_Origins.tableName, {});
  }
};
