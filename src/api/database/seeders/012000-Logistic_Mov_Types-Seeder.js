'use strict';

const { Logistic_Mov_Types } = require('../models/Logistic_Mov_Types');
const { Modules } = require('../models/Modules');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Logistic_Mov_Types.tableName,[{
      id: Logistic_Mov_Types.DELIVERY,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DELIVERY',
      is_output:1
    },{
      id: Logistic_Mov_Types.COLLECT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Logistic_Mov_Types.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'COLLECT',
      is_input: 1
    },{
      id: Logistic_Mov_Types.RETREAT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Logistic_Mov_Types.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'RETREAT',
      is_input: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Data_Origins.tableName, null, {});
  }
};
