'use strict';

/*imports*/
const { Movement_Groups } = require('../models/Movement_Groups');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movement_Groups.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movement_Groups.tableName);
  }
};