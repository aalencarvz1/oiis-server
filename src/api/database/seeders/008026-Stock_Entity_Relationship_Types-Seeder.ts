'use strict';

import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import  Stock_Entity_Relationship_Types  from '../models/Stock_Entity_Relationship_Types.js';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Stock_Entity_Relationship_Types.tableName,[{
      id: Stock_Entity_Relationship_Types.OWNER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'OWNER',
      is_owner: 1
    }],{
      ignoreDuplicates:true
    });  
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Stock_Entity_Relationship_Types.tableName, {});
  }
};
