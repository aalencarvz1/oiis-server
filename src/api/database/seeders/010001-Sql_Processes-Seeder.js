'use strict';

const { Sql_Processes } = require('../models/Sql_Processes');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const { Sql_Object_Types } = require('../models/Sql_Object_Types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Sql_Processes.tableName,[{      
      id:Sql_Processes.REPORT_SALES_COST_AND_PROFIT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id: Sql_Object_Types.SELECT,
      name : 'REPORT SALES COST AND PROFIT',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Sql_Object_Types.tableName, null, {});
  }
};
