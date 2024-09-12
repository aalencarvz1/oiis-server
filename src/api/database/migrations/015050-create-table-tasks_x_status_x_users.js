'use strict';

/*imports*/
const { Tasks_X_Status_X_Users } = require('../models/Tasks_X_Status_X_Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Tasks_X_Status_X_Users.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Tasks_X_Status_X_Users.tableName);
  }
};