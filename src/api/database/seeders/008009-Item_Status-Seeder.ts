'use strict';

import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import  Item_Status  from '../models/Item_Status.js';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Item_Status.tableName,[{
      id: Item_Status.NORMAL,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'NORMAL',
      is_disponible: 1,
      is_damaged: 0
    },{
      id: Item_Status.DAMAGED,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DAMAGED',
      is_disponible: 0,
      is_damaged: 1
    }],{
      ignoreDuplicates:true
    });  
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Item_Status.tableName, {});
  }
};
