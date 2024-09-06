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
      NAME : 'DATABASE',
    },{      
      id:SqlObjectsTypes.USER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.DATABASE,
      NAME : 'USER',
    },{      
      id:SqlObjectsTypes.SCHEMA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.DATABASE,
      NAME : 'SCHEMA',
    },{      
      id:SqlObjectsTypes.TABLE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SCHEMA,
      NAME : 'TABLE',
    },{      
      id:SqlObjectsTypes.FIELD,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.TABLE,
      NAME : 'FIELD',
    },{      
      id:SqlObjectsTypes.SELECT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'SELECT',
    },{      
      id:SqlObjectsTypes.FROM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,
      NAME : 'FROM',
    },{      
      id:SqlObjectsTypes.JOIN,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.FROM,
      NAME : 'JOIN',
    },{      
      id:SqlObjectsTypes.ON,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.JOIN,
      NAME : 'ON',
    },{      
      id:SqlObjectsTypes.WHERE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      NAME : 'WHERE',
    },{      
      id:SqlObjectsTypes.GROUP_BY,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      NAME : 'GROUP BY',
    },{      
      id:SqlObjectsTypes.HAVING,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      NAME : 'HAVING',
    },{      
      id:SqlObjectsTypes.ORDER_BY,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      NAME : 'ORDER BY',
    },{      
      id:SqlObjectsTypes.PIVOT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.SELECT,      
      NAME : 'PIVOT',
    },{      
      id:SqlObjectsTypes.FOR,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.PIVOT,      
      NAME : 'FOR',
    },{      
      id:SqlObjectsTypes.IN,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSUP : SqlObjectsTypes.PIVOT,      
      NAME : 'IN',
    },{      
      id:SqlObjectsTypes.TEXT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'TEXT',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(SqlObjectsTypes.name.toLowerCase(), null, {});
  }
};
