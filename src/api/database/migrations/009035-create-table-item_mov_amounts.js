'use strict';

/*imports*/
const { Item_Mov_Amounts } = require('../models/Item_Mov_Amounts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_Mov_Amounts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_Mov_Amounts.tableName);
  }
};