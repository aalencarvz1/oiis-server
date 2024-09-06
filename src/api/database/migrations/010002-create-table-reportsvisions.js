'use strict';

/*imports*/
const { ReportsVisions } = require('../models/ReportsVisions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReportsVisions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ReportsVisions.name.toLowerCase());
  }
};