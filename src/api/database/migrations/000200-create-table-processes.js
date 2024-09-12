'use strict';

/*imports*/
const { Processes } = require('../models/Processes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Processes.runUpMigration(queryInterface);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Processes.tableName);
  }
};