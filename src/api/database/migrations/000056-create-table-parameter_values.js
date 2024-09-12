'use strict';

/*imports*/
const { Parameter_Values } = require('../models/Parameter_Values');
const { Parameters } = require('../models/Parameters');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Parameter_Values.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});    
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Parameters);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Parameter_Values.tableName);
  }
};