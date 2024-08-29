'use strict';

/*imports*/
const { LogisticOrdersXItemsMovAmt } = require('../models/LogisticOrdersXItemsMovAmt');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticOrdersXItemsMovAmt.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticOrdersXItemsMovAmt.name.toUpperCase());    
  }
};