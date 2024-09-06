'use strict';

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { Utils } = require('../../controllers/utils/Utils');
const { DataTypes } = require('../models/DataTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { Parameters }  = require('../models/Parameters');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Parameters.name.toLowerCase(),[{
      id: Parameters.HAS_WINTHOR_INTEGRATION,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      name : 'HAS_WINTHOR_INTEGRATION',
      DEFAULTVALUE: Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) ? 1 : 0
    },{
      id: Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      name : 'LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER',
      DEFAULTVALUE: 1
    },{
      id: Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      name : 'WMS_OUTPUT_INTEGRATION_CHECK_RCA',
      DEFAULTVALUE: 1
    },{
      id: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      name : 'APPS_DELIVERY_MUST_CAPTURE_SIGNATURE',
      DEFAULTVALUE: 1
    },{
      id: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      name : 'APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE',
      DEFAULTVALUE: 0
    },{
      id: Parameters.APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      name : 'APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING',
      DEFAULTVALUE: 1
    },{
      id: Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDDATATYPE: DataTypes.BOOLEAN,
      name : 'WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS',
      DEFAULTVALUE: 1
    },{
      id: Parameters.COMMISSION_MIN_VAL,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDDATATYPE: DataTypes.NUMBER,
      name : 'COMMISSION_MIN_VAL',
      DEFAULTVALUE: 1844
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Parameters.name.toLowerCase(), null, {});
  }
};
