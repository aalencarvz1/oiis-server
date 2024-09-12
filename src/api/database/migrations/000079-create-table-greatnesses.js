'use strict';

/*imports*/
const { Greatnesses } = require('../models/Greatnesses');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Greatnesses.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});     
    
    await Greatnesses.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Greatnesses.migrateForeignKeyContraint(queryInterface,Data_Origins);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Greatnesses.tableName);
  }
};