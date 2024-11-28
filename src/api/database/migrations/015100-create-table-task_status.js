'use strict';

/*imports*/
const { Task_Status } = require('../models/Task_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Task_Status.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Task_Status.tableName);
  }
};