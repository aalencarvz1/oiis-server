'use strict';

/*imports*/
const { EpNegociosOrigem } = require('../models/ep/EpNegociosOrigem');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpNegociosOrigem.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpNegociosOrigem.name.toUpperCase());
  }
};