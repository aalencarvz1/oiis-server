'use strict';

/*imports*/
const { ItemsStatus } = require('../models/ItemsStatus');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsStatus.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsStatus.tableName);
  }
};