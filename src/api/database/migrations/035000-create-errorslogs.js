'use strict';

const { ErrorsLogs } = require('../models/winthor_integration/ErrorsLogs');

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ErrorsLogs.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await ErrorsLogs.runDownMigration(queryInterface);         
  }
};