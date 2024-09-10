'use strict';

/*imports*/
const { Movement_Status } = require('../models/Movement_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movement_Status.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movement_Status.tableName);
  }
};