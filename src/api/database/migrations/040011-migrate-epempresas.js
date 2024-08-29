'use strict';

/*imports*/
const { EpEmpresas } = require('../models/ep/EpEmpresas');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpEmpresas.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpEmpresas.name.toUpperCase());
  }
};