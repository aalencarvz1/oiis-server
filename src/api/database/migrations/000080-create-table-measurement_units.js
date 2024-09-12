'use strict';

/*imports*/
const { Measurement_Units } = require('../models/Measurement_Units');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Greatnesses } = require('../models/Greatnesses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Measurement_Units.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         
    
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Greatnesses);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Measurement_Units.tableName);
  }
};