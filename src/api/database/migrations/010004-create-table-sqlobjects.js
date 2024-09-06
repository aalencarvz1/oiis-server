'use strict';

/*imports*/
const { SqlObjects } = require('../models/SqlObjects');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await SqlObjects.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(SqlObjects.tableName);
  }
};