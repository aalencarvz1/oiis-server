'use strict';

/*imports*/
const { MovsXItemsStocks } = require('../models/MovsXItemsStocks');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MovsXItemsStocks.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MovsXItemsStocks.tableName);
  }
};