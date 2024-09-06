'use strict';

const { AccessesProfiles } = require('../models/AccessesProfiles');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(AccessesProfiles.name.toLowerCase(),[{      
      id:AccessesProfiles.DEFAULT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME:'DEFAULT',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      id:AccessesProfiles.ADMINISTRATIVE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME:'ADMINISTRATIVE',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      id:AccessesProfiles.GERENCIAL,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME:'GERENCIAL',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      id:AccessesProfiles.INVOICING,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME:'INVOICING',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      id:AccessesProfiles.FINANCIAL,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME:'FINANCIAL',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      id:AccessesProfiles.SUPERVISOR,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME:'SUPERVISOR',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      id:AccessesProfiles.SELLER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME:'SELLER',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      id:AccessesProfiles.SUPLIER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME:'SUPLIER',
      ALLOWACESSALLROUTINESOFMODULE:0
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(AccessesProfiles.name.toLowerCase(), null, {});
  }
};
