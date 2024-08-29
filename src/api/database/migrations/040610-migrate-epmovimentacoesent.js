'use strict';

/*imports*/
const { EpMovimentacoesEnt } = require('../models/ep/EpMovimentacoesEnt');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpMovimentacoesEnt.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpMovimentacoesEnt.name.toUpperCase());
  }
};