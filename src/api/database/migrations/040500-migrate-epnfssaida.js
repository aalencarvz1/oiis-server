'use strict';

/*imports*/
const { EpNfsSaida } = require('../models/ep/EpNfsSaida');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpNfsSaida.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpNfsSaida.name.toUpperCase());
  }
};