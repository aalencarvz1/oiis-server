'use strict';

/*imports*/
const { StatusSync } = require('../models/StatusSync');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await StatusSync.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                
    
    await StatusSync.migrateForeignKeyContraint(queryInterface, StatusRegs);  
    await StatusSync.migrateForeignKeyContraint(queryInterface, Data_Origins);      
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StatusSync.tableName);
  }
};