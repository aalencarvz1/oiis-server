'use strict';

/*imports*/
const { ApisResponses } = require('../models/ApisResponses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ApisResponses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ApisResponses.tableName);
  }
};