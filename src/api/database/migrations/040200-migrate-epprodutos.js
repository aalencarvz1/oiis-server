'use strict';

/*imports*/
const { EpProdutos } = require('../models/ep/EpProdutos');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpProdutos.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpProdutos.name.toUpperCase());
  }
};