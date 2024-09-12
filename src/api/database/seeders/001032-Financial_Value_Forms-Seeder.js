'use strict';

const { Financial_Value_Forms } = require('../models/Financial_Value_Forms');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Financial_Value_Forms.tableName,[{      
      id:Financial_Value_Forms.NONE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'NONE'
    },{      
      id:Financial_Value_Forms.MONEY,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'MONEY',
      ISPHYSICAL: 1
    },{      
      id:Financial_Value_Forms.BOLET,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'BOLET',
      ISELETRONIC: 1,
      ISBOLET: 1
    },{      
      id:Financial_Value_Forms.CHECK,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CHECK',
      ISELETRONIC: 1
    },{      
      id:Financial_Value_Forms.PIX,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'PIX',
      ISELETRONIC: 1
    },{      
      id:Financial_Value_Forms.CARD,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CARD',
      ISELETRONIC: 1,
      ISCARD: 1
    },{      
      id:Financial_Value_Forms.DEPOSIT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DEPOSIT',
      ISELETRONIC: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Financial_Value_Forms.tableName, null, {});
  }
};
