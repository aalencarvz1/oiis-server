'use strict';

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { Utils } = require('../../controllers/utils/Utils');
const { Data_Types } = require('../models/Data_Types');
const { Data_Origins } = require('../models/Data_Origins');
const { Parameters }  = require('../models/Parameters');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Parameters.tableName,[{
      id: Parameters.HAS_WINTHOR_INTEGRATION,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.BOOLEAN,
      name : 'HAS_WINTHOR_INTEGRATION',
      default_value: Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) ? 1 : 0
    },{
      id: Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.BOOLEAN,
      name : 'LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER',
      default_value: 1
    },{
      id: Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.BOOLEAN,
      name : 'WMS_OUTPUT_INTEGRATION_CHECK_RCA',
      default_value: 1
    },{
      id: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.BOOLEAN,
      name : 'APPS_DELIVERY_MUST_CAPTURE_SIGNATURE',
      default_value: 1
    },{
      id: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.BOOLEAN,
      name : 'APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE',
      default_value: 0
    },{
      id: Parameters.APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.BOOLEAN,
      name : 'APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING',
      default_value: 1
    },{
      id: Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.BOOLEAN,
      name : 'WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS',
      default_value: 1 
    },{
      id: Parameters.COMMISSION_MIN_VAL,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.NUMBER,
      name : 'COMMISSION_MIN_VAL',
      default_value: 1844
    },{
      id: Parameters.WINTHOR_CUSTOMIZED_GIRO_STOCK_DAYS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      data_type_id: Data_Types.NUMBER,
      name : 'WINTHOR_CUSTOMIZED_GIRO_STOCK_DAYS',
      default_value: null
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Parameters.tableName, null, {});
  }
};
