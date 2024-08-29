'use strict';

/*imports*/
const { CondictionsItems } = require('../models/CondictionsItems');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await CondictionsItems.runUpMigration(queryInterface);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CondictionsItems.name.toUpperCase());
  }
};