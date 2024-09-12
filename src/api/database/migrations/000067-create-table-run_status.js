'use strict';

/*imports*/
const { Run_Status } = require('../models/Run_Status');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Run_Status.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                
    
    await Run_Status.migrateForeignKeyContraint(queryInterface, Record_Status);  
    await Run_Status.migrateForeignKeyContraint(queryInterface, Data_Origins);      
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Run_Status.tableName);
  }
};