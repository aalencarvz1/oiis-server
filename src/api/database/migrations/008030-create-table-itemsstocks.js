'use strict';

/*imports*/
const { ItemsStocks } = require('../models/ItemsStocks');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsStocks.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsStocks.name.toUpperCase());
  }
};