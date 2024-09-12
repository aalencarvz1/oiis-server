'use strict';

/*imports*/
const { Report_Visions } = require('../models/Report_Visions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Report_Visions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Report_Visions.tableName);
  }
};