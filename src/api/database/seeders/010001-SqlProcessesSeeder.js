'use strict';

const { SqlProcesses } = require('../models/SqlProcesses');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { SqlObjectsTypes } = require('../models/SqlObjectsTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(SqlProcesses.name.toUpperCase(),[{      
      ID:SqlProcesses.REPORT_SALES_COST_AND_PROFIT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDSQLOBJECTTYPE: SqlObjectsTypes.SELECT,
      NAME : 'REPORT SALES COST AND PROFIT',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(SqlObjectsTypes.name.toUpperCase(), null, {});
  }
};
