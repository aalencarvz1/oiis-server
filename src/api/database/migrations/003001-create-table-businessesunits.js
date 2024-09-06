'use strict';

/*imports*/
const { BusinessesUnits } = require('../models/BusinessesUnits');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await BusinessesUnits.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(BusinessesUnits.tableName);
  }
};