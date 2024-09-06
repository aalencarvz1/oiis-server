'use strict';

/*imports*/
const { CommissionsItems } = require('../models/CommissionsItems');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await CommissionsItems.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CommissionsItems.tableName);
  }
};