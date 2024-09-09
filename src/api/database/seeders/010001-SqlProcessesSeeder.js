'use strict';

const { SqlProcesses } = require('../models/SqlProcesses');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { SqlObjectsTypes } = require('../models/SqlObjectsTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(SqlProcesses.tableName,[{      
      id:SqlProcesses.REPORT_SALES_COST_AND_PROFIT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSQLOBJECTTYPE: SqlObjectsTypes.SELECT,
      name : 'REPORT SALES COST AND PROFIT',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(SqlObjectsTypes.tableName, null, {});
  }
};
