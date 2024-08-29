'use strict';

/*imports*/
const { EpMovimentacoesSaida } = require('../models/ep/EpMovimentacoesSaida');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpMovimentacoesSaida.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpMovimentacoesSaida.name.toUpperCase());
  }
};