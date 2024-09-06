'use strict';

/*imports*/
const { ItemsStocksUnits } = require('../models/ItemsStocksUnits');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsStocksUnits.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsStocksUnits.name.toLowerCase());
  }
};