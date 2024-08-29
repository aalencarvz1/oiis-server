'use strict';

/*imports*/
const { EpCategoriasOrigem } = require('../models/ep/EpCategoriasOrigem');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpCategoriasOrigem.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpCategoriasOrigem.name.toUpperCase());
  }
};