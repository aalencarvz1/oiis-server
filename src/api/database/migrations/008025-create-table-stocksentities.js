'use strict';

/*imports*/
const { StocksEntities } = require('../models/StocksEntities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await StocksEntities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StocksEntities.tableName);
  }
};