'use strict';

/*imports*/
const { Project_Task_Types } = require('../models/Project_Task_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Project_Task_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Project_Task_Types.tableName);
  }
};