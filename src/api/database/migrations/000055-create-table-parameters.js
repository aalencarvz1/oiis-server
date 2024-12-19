'use strict';

/*imports*/
const { Parameters } = require('../models/Parameters');
const { Data_Types } = require('../models/Data_Types');
const { Tables } = require('../models/Tables');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Parameters.runUpMigration(queryInterface,{migrateForeignKeyContraint:false}); 
    await Parameters.migrateForeignKeyContraint(queryInterface,Data_Types);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Tables);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Parameters.tableName);
  }
};