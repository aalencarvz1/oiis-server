'use strict';

/*imports*/
const { LogisticStatus } = require('../models/LogisticStatus');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticStatus.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticStatus.name.toUpperCase());    
  }
};