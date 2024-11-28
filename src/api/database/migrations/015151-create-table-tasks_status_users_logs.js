'use strict';

/*imports*/
const { Tasks_Status_Users_Logs } = require('../models/Tasks_Status_Users_Logs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Tasks_Status_Users_Logs.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Tasks_Status_Users_Logs.tableName);
  }
};