'use strict';

/*imports*/
const { LogisticReasons } = require('../models/LogisticReasons');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticReasons.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticReasons.name.toUpperCase());    
  }
};