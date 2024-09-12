'use strict';

/*imports*/
const { Item_Mov_Units } = require('../models/Item_Mov_Units');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_Mov_Units.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_Mov_Units.tableName);
  }
};