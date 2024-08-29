'use strict';

/*imports*/
const { EpVendedores } = require('../models/ep/EpVendedores');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpVendedores.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpVendedores.name.toUpperCase());
  }
};