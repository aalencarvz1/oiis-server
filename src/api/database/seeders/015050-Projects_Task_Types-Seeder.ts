'use strict';

import  Project_Task_Types  from '../models/Project_Task_Types.js';
import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    
    await queryInterface.bulkInsert(Project_Task_Types.tableName,[{
      id: Project_Task_Types.TASK,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'TASK'
    },{
      id: Project_Task_Types.DOCUMENTATION,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DOCUMENTATION'
    },{
      id: Project_Task_Types.PLANNING,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'PLANNING'
    },{
      id: Project_Task_Types.EXECUTION,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'EXECUTION'
    },{
      id: Project_Task_Types.DEVELOPMENT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DEVELOPMENT'
    },{
      id: Project_Task_Types.IMPROVEMENT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'IMPROVEMENT'
    },{
      id: Project_Task_Types.CORRECTION,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CORRECTION'
    }],{
      ignoreDuplicates:true
    });

    
     
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Project_Task_Types.tableName, {});
  }
};
