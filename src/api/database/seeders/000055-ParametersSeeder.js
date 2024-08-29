'use strict';

const { DataTypes } = require('../models/DataTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { Parameters }  = require('../models/Parameters');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Parameters.name.toUpperCase(),[{
      ID: Parameters.INTEGRATE_WINTHOR,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      NAME : 'INTEGRATE_WINTHOR',
      DEFAULTVALUE: 1
    },{
      ID: Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      NAME : 'LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER',
      DEFAULTVALUE: 1
    },{
      ID: Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      NAME : 'WMS_OUTPUT_INTEGRATION_CHECK_RCA',
      DEFAULTVALUE: 1
    },{
      ID: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      NAME : 'APPS_DELIVERY_MUST_CAPTURE_SIGNATURE',
      DEFAULTVALUE: 1
    },{
      ID: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      NAME : 'APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE',
      DEFAULTVALUE: 0
    },{
      ID: Parameters.APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      NAME : 'APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING',
      DEFAULTVALUE: 1
    },{
      ID: Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      NAME : 'WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS',
      DEFAULTVALUE: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Parameters.name.toUpperCase(), null, {});
  }
};
