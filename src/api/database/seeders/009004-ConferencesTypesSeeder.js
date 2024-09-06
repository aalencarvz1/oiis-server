'use strict';

const { ConferencesTypes } = require('../models/ConferencesTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(ConferencesTypes.name.toLowerCase(),[{      
      id:ConferencesTypes.NORMAL,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'NORMAL',
      NORMAL: 1
    },{      
      id:ConferencesTypes.CEGA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'CEGA',
      CEGA: 1
    },{      
      id:ConferencesTypes.SEMICEGA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'SEMICEGA',
      SEMICEGA: 1
    },{      
      id:ConferencesTypes.XML_WITH_LOT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'XML_WITH_LOT',
      NORMAL: 1
    },{      
      id:ConferencesTypes.XML_WITHOUT_LOT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'XML_WITHOUT_LOT',
      SEMICEGA: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(ConferencesTypes.name.toLowerCase(), null, {});
  }
};
