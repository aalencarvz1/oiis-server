'use strict';

/*imports*/
const { Commission_Items } = require('../models/Commission_Items');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Commission_Items.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Commission_Items.tableName);
  }
};