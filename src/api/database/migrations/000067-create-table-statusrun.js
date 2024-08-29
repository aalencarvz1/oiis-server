'use strict';

/*imports*/
const { StatusRun } = require('../models/StatusRun');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await StatusRun.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                
    
    await StatusRun.migrateForeignKeyContraint(queryInterface, StatusRegs);  
    await StatusRun.migrateForeignKeyContraint(queryInterface, OriginsDatas);      
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StatusRun.name.toUpperCase());
  }
};