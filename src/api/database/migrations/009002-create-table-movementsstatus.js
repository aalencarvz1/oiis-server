'use strict';

/*imports*/
const { MovementsStatus } = require('../models/MovementsStatus');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MovementsStatus.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MovementsStatus.name.toUpperCase());
  }
};