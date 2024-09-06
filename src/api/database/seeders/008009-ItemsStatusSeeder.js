'use strict';

const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { ItemsStatus } = require('../models/ItemsStatus');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(ItemsStatus.tableName,[{
      id: ItemsStatus.NORMAL,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'NORMAL',
      ISDISPONIBLE: 1,
      ISDAMAGED: 0
    },{
      id: ItemsStatus.DAMAGED,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DAMAGED',
      ISDISPONIBLE: 0,
      ISDAMAGED: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(ItemsStatus.tableName, null, {});
  }
};
