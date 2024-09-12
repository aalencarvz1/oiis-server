'use strict';

/*imports*/
const { Tasks_X_Status_X_Users_Logs } = require('../models/Tasks_X_Status_X_Users_Logs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Tasks_X_Status_X_Users_Logs.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Tasks_X_Status_X_Users_Logs.tableName);
  }
};