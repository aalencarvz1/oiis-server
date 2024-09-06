'use strict';

/*imports*/
const { MovementsXEntities } = require('../models/MovementsXEntities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MovementsXEntities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MovementsXEntities.name.toLowerCase());
  }
};