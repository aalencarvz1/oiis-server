'use strict';

/*imports*/
const { EpPracasClientes } = require('../models/ep/EpPracasClientes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpPracasClientes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpPracasClientes.name.toUpperCase());
  }
};