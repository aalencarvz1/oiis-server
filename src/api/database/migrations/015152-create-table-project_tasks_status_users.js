'use strict';

/*imports*/
const { Project_Tasks_Status_Users } = require('../models/Project_Tasks_Status_Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Project_Tasks_Status_Users.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Project_Tasks_Status_Users.tableName);
  }
};