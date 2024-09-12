'use strict';

/*imports*/
const { Item_Status } = require('../models/Item_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_Status.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_Status.tableName);
  }
};