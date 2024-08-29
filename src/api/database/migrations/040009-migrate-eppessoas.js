'use strict';

/*imports*/
const { EpPessoas } = require('../models/ep/EpPessoas');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpPessoas.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpPessoas.name.toUpperCase());
  }
};