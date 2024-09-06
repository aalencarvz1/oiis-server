'use strict';

const { RoutinesTypes } = require('../models/RoutinesTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(RoutinesTypes.tableName,[{      
      id:RoutinesTypes.SYSTEM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM'
    },{      
      id:RoutinesTypes.REGISTER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'REGISTER'
    },{      
      id:RoutinesTypes.REPORT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'REPORT'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:['status_reg_id','name']
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(RoutinesTypes.tableName, null, {});
  }
};
