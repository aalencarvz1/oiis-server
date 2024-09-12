'use strict';

/*imports*/
const { Movement_Types } = require('../models/Movement_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movement_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movement_Types.tableName);
  }
};