'use strict';

/*imports*/
const { ApisMapsResponses } = require('../models/ApisMapsResponses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ApisMapsResponses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ApisMapsResponses.name.toUpperCase());
  }
};