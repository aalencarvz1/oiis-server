'use strict';

import  Movement_Entity_Relationship_Types  from '../models/Movement_Entity_Relationship_Types.js';
import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Movement_Entity_Relationship_Types.tableName,[{
      id:Movement_Entity_Relationship_Types.ORIGIN_INPUT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ORIGIN_INPUT',
      is_origin : 1,
      is_target : 0,
      is_input : 1,
      is_output : 0
    },{
      id:Movement_Entity_Relationship_Types.TARGET_INPUT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'TARGET_INPUT',
      is_origin : 0,
      is_target : 1,
      is_input : 1,
      is_output : 0
    },{
      id:Movement_Entity_Relationship_Types.ORIGIN_OUTPUT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ORIGIN_OUTPUT',
      is_origin : 1,
      is_target : 0,
      is_input : 0,
      is_output : 1
    },{
      id:Movement_Entity_Relationship_Types.TARGET_OUTPUT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'TARGET_OUTPUT',
      is_origin : 0,
      is_target : 1,
      is_input : 0,
      is_output : 1
    }],{
      ignoreDuplicates:true
    });
     
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Movement_Entity_Relationship_Types.tableName, {});
  }
};
