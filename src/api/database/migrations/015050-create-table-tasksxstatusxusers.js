'use strict';

/*imports*/
const { TasksXStatusXUsers } = require('../models/TasksXStatusXUsers');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await TasksXStatusXUsers.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TasksXStatusXUsers.name.toUpperCase());
  }
};