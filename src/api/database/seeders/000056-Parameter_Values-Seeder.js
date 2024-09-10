'use strict';

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { Utils } = require('../../controllers/utils/Utils');
const { Data_Origins } = require('../models/Data_Origins');
const { Parameters } = require('../models/Parameters');
const { Parameter_Values }  = require('../models/Parameter_Values');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Parameter_Values.tableName,[{
      id: Parameters.HAS_WINTHOR_INTEGRATION,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPARAMETER: Parameters.HAS_WINTHOR_INTEGRATION,
      VALUE : Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) ? 1 : 0
    },{
      id: Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPARAMETER: Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER,
      VALUE : 1
    },{
      id: Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPARAMETER: Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA,
      VALUE : 1
    },{
      id: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPARAMETER: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE,
      VALUE : 1
    },{
      id: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPARAMETER: Parameters.APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE,
      VALUE : 0
    },{
      id: Parameters.APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPARAMETER: Parameters.APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING,
      VALUE : 1
    },{
      id: Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPARAMETER: Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS,
      VALUE : 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Parameter_Values.tableName, null, {});
  }
};
