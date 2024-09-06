'use strict';

const { SqlProcesses } = require('../models/SqlProcesses');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { SqlObjectsTypes } = require('../models/SqlObjectsTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(SqlProcesses.name.toLowerCase(),[{      
      id:SqlProcesses.REPORT_SALES_COST_AND_PROFIT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSQLOBJECTTYPE: SqlObjectsTypes.SELECT,
      NAME : 'REPORT SALES COST AND PROFIT',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(SqlObjectsTypes.name.toLowerCase(), null, {});
  }
};
