'use strict';

/*imports*/
const { EpClientes } = require('../models/ep/EpClientes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpClientes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpClientes.name.toUpperCase());
  }
};