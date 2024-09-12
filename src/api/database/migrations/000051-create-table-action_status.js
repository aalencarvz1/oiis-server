'use strict';

/*imports*/
const { Action_Status } = require('../models/Action_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Action_Status.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                       
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Action_Status.tableName);
  }
};