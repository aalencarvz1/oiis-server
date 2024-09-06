'use strict';

/*imports*/
const { ReportsDatasFountsItems } = require('../models/ReportsDatasFountsItems');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReportsDatasFountsItems.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ReportsDatasFountsItems.tableName);
  }
};