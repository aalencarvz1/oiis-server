'use strict';

/*imports*/
const { Report_Data_Founts } = require('../models/Report_Data_Founts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Report_Data_Founts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Report_Data_Founts.tableName);
  }
};