'use strict';

/*imports*/
const { TasksStatus } = require('../models/TasksStatus');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await TasksStatus.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TasksStatus.name.toUpperCase());
  }
};