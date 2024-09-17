'use strict';

const { Movement_Entity_Relationship_Types } = require('../models/Movement_Entity_Relationship_Types');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Movement_Entity_Relationship_Types.tableName,[{
      id:Movement_Entity_Relationship_Types.ORIGIN_INPUT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ORIGIN_INPUT',
      ISORIGIN : 1,
      ISTARGET : 0,
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
      ISORIGIN : 0,
      ISTARGET : 1,
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
      ISORIGIN : 1,
      ISTARGET : 0,
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
      ISORIGIN : 0,
      ISTARGET : 1,
      is_input : 0,
      is_output : 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Movement_Entity_Relationship_Types.tableName, null, {});
  }
};
