'use strict';

import  Sql_Processes  from '../models/Sql_Processes.js';
import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import  Sql_Object_Types  from '../models/Sql_Object_Types.js';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Sql_Processes.tableName,[{      
      id:Sql_Processes.REPORT_SALES_COST_AND_PROFIT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id: Sql_Object_Types.SELECT,
      name : 'REPORT SALES COST AND PROFIT',
    }],{
      ignoreDuplicates:true
    });
     
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Sql_Object_Types.tableName, {});
  }
};
