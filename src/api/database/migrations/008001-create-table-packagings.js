'use strict';

/*imports*/
const { Packagings } = require('../models/Packagings');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Packagings.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Packagings.name.toUpperCase());
  }
};