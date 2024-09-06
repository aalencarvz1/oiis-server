'use strict';

/*imports*/
const { CollaboratorsContracts } = require('../models/CollaboratorsContracts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await CollaboratorsContracts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CollaboratorsContracts.tableName);
  }
};