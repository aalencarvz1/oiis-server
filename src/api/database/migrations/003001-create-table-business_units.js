'use strict';

/*imports*/
const { Business_Units } = require('../models/Business_Units');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Business_Units.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Business_Units.tableName);
  }
};