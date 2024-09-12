'use strict';

/*imports*/
const { Report_Data_Fount_Items } = require('../models/Report_Data_Fount_Items');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Report_Data_Fount_Items.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Report_Data_Fount_Items.tableName);
  }
};