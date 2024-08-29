'use strict';

/*imports*/
const { EpFornecedores } = require('../models/ep/EpFornecedores');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpFornecedores.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpFornecedores.name.toUpperCase());
  }
};