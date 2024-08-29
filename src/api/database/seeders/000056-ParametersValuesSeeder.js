'use strict';

const { OriginsDatas } = require('../models/OriginsDatas');
const { Parameters } = require('../models/Parameters');
const { ParametersValues }  = require('../models/ParametersValues');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(ParametersValues.name.toUpperCase(),[{
      ID: Parameters.INTEGRATE_WINTHOR,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPARAMETER: Parameters.INTEGRATE_WINTHOR,
      VALUE : 1
    },{
      ID: Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPARAMETER: Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER,
      VALUE : 1
    },{
      ID: Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPARAMETER: Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA,
      VALUE : 1
    },{
      ID: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPARAMETER: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE,
      VALUE : 1
    },{
      ID: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPARAMETER: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE,
      VALUE : 0
    },{
      ID: Parameters.APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPARAMETER: Parameters.APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING,
      VALUE : 1
    },{
      ID: Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPARAMETER: Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS,
      VALUE : 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(ParametersValues.name.toUpperCase(), null, {});
  }
};
