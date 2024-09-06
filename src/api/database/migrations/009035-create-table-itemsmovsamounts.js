'use strict';

/*imports*/
const { ItemsMovsAmounts } = require('../models/ItemsMovsAmounts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsMovsAmounts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsMovsAmounts.tableName);
  }
};