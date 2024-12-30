'use strict';

import  Data_Origins  from '../models/Data_Origins.js';
import Project_Item_Origin_Types from '../models/Project_Item_Origin_Types.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    
    await queryInterface.bulkInsert(Project_Item_Origin_Types.tableName,[{      
      id:Project_Item_Origin_Types.USER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'USER',
      is_system:0
    },{      
      id:Project_Item_Origin_Types.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'SYSTEM',
      is_system:1
    }],{
      ignoreDuplicates:true
    });
     
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Project_Item_Origin_Types.tableName, {});
  }
};
