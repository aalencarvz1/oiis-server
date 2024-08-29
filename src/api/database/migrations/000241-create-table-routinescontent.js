'use strict';

/*imports*/
const { RoutinesContent } = require('../models/RoutinesContent');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await RoutinesContent.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(RoutinesContent.name.toUpperCase());
  }
};