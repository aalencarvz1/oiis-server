'use strict';

/*imports*/
const { ActionStatus } = require('../models/ActionStatus');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ActionStatus.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                       
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ActionStatus.tableName);
  }
};