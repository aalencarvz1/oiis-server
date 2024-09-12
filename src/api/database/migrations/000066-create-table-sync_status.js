'use strict';

/*imports*/
const { Sync_Status } = require('../models/Sync_Status');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Sync_Status.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                
    
    await Sync_Status.migrateForeignKeyContraint(queryInterface, Record_Status);  
    await Sync_Status.migrateForeignKeyContraint(queryInterface, Data_Origins);      
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Sync_Status.tableName);
  }
};