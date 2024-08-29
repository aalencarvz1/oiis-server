'use strict';

/*imports*/
const { EpRedesClientes } = require('../models/ep/EpRedesClientes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpRedesClientes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpRedesClientes.name.toUpperCase());
  }
};