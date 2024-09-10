'use strict';

/*imports*/
const { Sql_Objects } = require('../models/Sql_Objects');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Sql_Objects.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Sql_Objects.tableName);
  }
};