'use strict';

/*imports*/
const { Requirements } = require('../models/Requirements');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Requirements.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Requirements.tableName);
  }
};