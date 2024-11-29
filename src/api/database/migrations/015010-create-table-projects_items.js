'use strict';

/*imports*/
const { Projects_Items } = require('../models/Projects_Items');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Projects_Items.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Projects_Items.tableName);
  }
};