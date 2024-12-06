'use strict';

/*imports*/
const { Project_Tasks } = require('../models/Project_Tasks');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Project_Tasks.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Project_Tasks.tableName);
  }
};