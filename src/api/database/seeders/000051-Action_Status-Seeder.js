'use strict';

const { Action_Status } = require('../models/Action_Status');
const { Modules } = require('../models/Modules');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Action_Status.tableName,[{
      id: Action_Status.NOT_STARTED,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'NOT STARTED'      
    },{
      id: Action_Status.RUNNING,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Action_Status.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'RUNNING',
      is_started: 1,
      is_running: 1
    },{
      id: Action_Status.STOPPED,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Action_Status.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'STOPPED',
      is_started: 1,
      is_stopped: 1
    },{
      id: Action_Status.CANCELED,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Action_Status.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CANCELED',
      is_canceled: 1
    },{
      id: Action_Status.CONCLUDED,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Action_Status.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CONCLUDED',
      is_concluded: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Data_Origins.tableName, null, {});
  }
};
