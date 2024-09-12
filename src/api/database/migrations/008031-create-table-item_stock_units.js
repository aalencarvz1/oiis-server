'use strict';

/*imports*/
const { Item_Stock_Units } = require('../models/Item_Stock_Units');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_Stock_Units.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_Stock_Units.tableName);
  }
};