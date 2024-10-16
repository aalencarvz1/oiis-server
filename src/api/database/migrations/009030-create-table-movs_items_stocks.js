'use strict';

/*imports*/
const { Movs_Items_Stocks } = require('../models/Movs_Items_Stocks');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movs_Items_Stocks.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movs_Items_Stocks.tableName);
  }
};