'use strict';

const { SqlObjectsTypes } = require('../models/SqlObjectsTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(SqlObjectsTypes.name.toLowerCase(),[{      
      id:SqlObjectsTypes.DATABASE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DATABASE',
    },{      
      id:SqlObjectsTypes.USER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.DATABASE,
      name : 'USER',
    },{      
      id:SqlObjectsTypes.SCHEMA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.DATABASE,
      name : 'SCHEMA',
    },{      
      id:SqlObjectsTypes.TABLE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SCHEMA,
      name : 'TABLE',
    },{      
      id:SqlObjectsTypes.FIELD,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.TABLE,
      name : 'FIELD',
    },{      
      id:SqlObjectsTypes.SELECT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'SELECT',
    },{      
      id:SqlObjectsTypes.FROM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,
      name : 'FROM',
    },{      
      id:SqlObjectsTypes.JOIN,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.FROM,
      name : 'JOIN',
    },{      
      id:SqlObjectsTypes.ON,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.JOIN,
      name : 'ON',
    },{      
      id:SqlObjectsTypes.WHERE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      name : 'WHERE',
    },{      
      id:SqlObjectsTypes.GROUP_BY,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      name : 'GROUP BY',
    },{      
      id:SqlObjectsTypes.HAVING,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      name : 'HAVING',
    },{      
      id:SqlObjectsTypes.ORDER_BY,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      name : 'ORDER BY',
    },{      
      id:SqlObjectsTypes.PIVOT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      name : 'PIVOT',
    },{      
      id:SqlObjectsTypes.FOR,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.PIVOT,      
      name : 'FOR',
    },{      
      id:SqlObjectsTypes.IN,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.PIVOT,      
      name : 'IN',
    },{      
      id:SqlObjectsTypes.TEXT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'TEXT',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(SqlObjectsTypes.name.toLowerCase(), null, {});
  }
};
