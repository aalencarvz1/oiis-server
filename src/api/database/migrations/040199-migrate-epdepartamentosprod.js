'use strict';

/*imports*/
const { EpDepartamentosProd } = require('../models/ep/EpDeparamentosProd');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpDepartamentosProd.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpDepartamentosProd.name.toUpperCase());
  }
};