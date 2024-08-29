'use strict';

const { AccessesProfiles } = require('../models/AccessesProfiles');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(AccessesProfiles.name.toUpperCase(),[{      
      ID:AccessesProfiles.DEFAULT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'DEFAULT',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      ID:AccessesProfiles.ADMINISTRATIVE,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'ADMINISTRATIVE',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      ID:AccessesProfiles.GERENCIAL,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'GERENCIAL',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      ID:AccessesProfiles.INVOICING,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'INVOICING',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      ID:AccessesProfiles.FINANCIAL,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'FINANCIAL',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      ID:AccessesProfiles.SUPERVISOR,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'SUPERVISOR',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      ID:AccessesProfiles.SELLER,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'SELLER',
      ALLOWACESSALLROUTINESOFMODULE:0
    },{      
      ID:AccessesProfiles.SUPLIER,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'SUPLIER',
      ALLOWACESSALLROUTINESOFMODULE:0
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(AccessesProfiles.name.toUpperCase(), null, {});
  }
};
