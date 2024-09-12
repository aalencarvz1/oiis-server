'use strict';

const { Routine_Types } = require('../models/Routine_Types');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Routine_Types.tableName,[{      
      id:Routine_Types.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM'
    },{      
      id:Routine_Types.REGISTER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'REGISTER'
    },{      
      id:Routine_Types.REPORT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'REPORT'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:['status_reg_id','name']
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Routine_Types.tableName, null, {});
  }
};
