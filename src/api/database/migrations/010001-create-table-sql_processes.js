'use strict';

/*imports*/
const { Sql_Processes } = require('../models/Sql_Processes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Sql_Processes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Sql_Processes.tableName);
  }
};