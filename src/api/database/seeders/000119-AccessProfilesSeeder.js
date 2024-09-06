'use strict';

const { AccessProfiles } = require('../models/AccessProfiles');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(AccessProfiles.tableName,[{      
      id:AccessProfiles.DEFAULT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'DEFAULT',
      allow_access_to_all_module_routines:0
    },{      
      id:AccessProfiles.ADMINISTRATIVE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'ADMINISTRATIVE',
      allow_access_to_all_module_routines:0
    },{      
      id:AccessProfiles.GERENCIAL,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'GERENCIAL',
      allow_access_to_all_module_routines:0
    },{      
      id:AccessProfiles.INVOICING,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'INVOICING',
      allow_access_to_all_module_routines:0
    },{      
      id:AccessProfiles.FINANCIAL,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'FINANCIAL',
      allow_access_to_all_module_routines:0
    },{      
      id:AccessProfiles.SUPERVISOR,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SUPERVISOR',
      allow_access_to_all_module_routines:0
    },{      
      id:AccessProfiles.SELLER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SELLER',
      allow_access_to_all_module_routines:0
    },{      
      id:AccessProfiles.SUPLIER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SUPLIER',
      allow_access_to_all_module_routines:0
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(AccessProfiles.tableName, null, {});
  }
};
