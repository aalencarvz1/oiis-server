'use strict';

/*imports*/
const { Value_Names } = require('../models/Value_Names');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Value_Names.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Value_Names.tableName);
  }
};