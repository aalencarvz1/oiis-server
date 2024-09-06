'use strict';

/*imports*/
const { TasksXStatusXUsersLogs } = require('../models/TasksXStatusXUsersLogs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await TasksXStatusXUsersLogs.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TasksXStatusXUsersLogs.tableName);
  }
};