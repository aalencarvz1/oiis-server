'use strict';

/*imports*/
const { Item_Stocks } = require('../models/Item_Stocks');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_Stocks.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_Stocks.tableName);
  }
};