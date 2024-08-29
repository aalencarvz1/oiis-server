'use strict';

/*imports*/
const { ReportsDatasFounts } = require('../models/ReportsDatasFounts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReportsDatasFounts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ReportsDatasFounts.name.toUpperCase());
  }
};