'use strict';

/*imports*/
const { SqlProcesses } = require('../models/SqlProcesses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await SqlProcesses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(SqlProcesses.tableName);
  }
};