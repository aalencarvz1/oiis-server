'use strict';

/*imports*/
const { Tasks_Status_Users } = require('../models/Tasks_Status_Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Tasks_Status_Users.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Tasks_Status_Users.tableName);
  }
};