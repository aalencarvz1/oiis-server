'use strict';

/*imports*/
const { LogisticLogs } = require('../models/LogisticLogs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticLogs.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticLogs.name.toLowerCase());    
  }
};