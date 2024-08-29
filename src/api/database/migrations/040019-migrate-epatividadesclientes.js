'use strict';

/*imports*/
const { EpAtividadesClientes } = require('../models/ep/EpAtividadesClientes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpAtividadesClientes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpAtividadesClientes.name.toUpperCase());
  }
};