'use strict';

/*imports*/
const { Projects_Items_Types } = require('../models/Projects_Items_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Projects_Items_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Projects_Items_Types.tableName);
  }
};