'use strict';

/*imports*/
const { EpTrabalhadores } = require('../models/ep/EpTrabalhadores');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpTrabalhadores.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpTrabalhadores.name.toUpperCase());
  }
};