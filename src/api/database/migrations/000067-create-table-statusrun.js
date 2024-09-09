'use strict';

/*imports*/
const { StatusRun } = require('../models/StatusRun');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await StatusRun.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                
    
    await StatusRun.migrateForeignKeyContraint(queryInterface, StatusRegs);  
    await StatusRun.migrateForeignKeyContraint(queryInterface, Data_Origins);      
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StatusRun.tableName);
  }
};