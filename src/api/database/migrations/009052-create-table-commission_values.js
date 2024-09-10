'use strict';

/*imports*/
const { Commission_Values } = require('../models/Commission_Values');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Commission_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Commission_Values.tableName);
  }
};