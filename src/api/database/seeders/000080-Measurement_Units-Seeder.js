'use strict';

const { Greatnesses } = require('../models/Greatnesses');
const { Measurement_Units } = require('../models/Measurement_Units');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Measurement_Units.tableName,[{
      id: Measurement_Units.UN,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'UNIT',
      sigla: 'UN',
      is_scalar: 1
    },{
      id: Measurement_Units.KG,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.MASS,
      name : 'KILOGRAM',
      sigla: 'KG',
      is_scalar: 1
    },{
      id: Measurement_Units.L,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.VOLUM,
      name : 'LITER',
      sigla: 'L',
      is_scalar: 1
    },{
      id: Measurement_Units.PC,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'PIECE',
      sigla: 'PC',
      is_scalar: 1
    },{
      id: Measurement_Units.PKG,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'PACKAGE',
      sigla: 'PK',
      is_scalar: 1
    },{
      id: Measurement_Units.BOX,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'BOX',
      sigla: 'BX',
      is_scalar: 1
    },{
      id: Measurement_Units.BCK,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'BUCKET',
      sigla: 'BK',
      is_scalar: 1
    },{
      id: Measurement_Units.CAN,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'CAN',
      sigla: 'CN',
      is_scalar: 1
    },{
      id: Measurement_Units.BAG,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'BAG',
      sigla: 'BG',
      is_scalar: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Data_Origins.tableName, null, {});
  }
};
