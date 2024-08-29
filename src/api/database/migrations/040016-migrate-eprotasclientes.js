'use strict';

/*imports*/
const { EpRotasClientes } = require('../models/ep/EpRotasClientes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpRotasClientes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpRotasClientes.name.toUpperCase());
  }
};