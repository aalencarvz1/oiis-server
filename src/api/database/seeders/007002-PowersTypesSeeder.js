'use strict';

const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { PowersTypes } = require('../models/PowersTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(PowersTypes.tableName,[{      
      id:PowersTypes.SYSTEM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM'
    },{      
      id:PowersTypes.ACCESS,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name: 'ACCESS',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(PowersTypes.tableName, null, {});
  }
};
