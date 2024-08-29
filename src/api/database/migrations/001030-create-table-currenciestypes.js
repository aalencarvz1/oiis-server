'use strict';

/*imports*/
const { CurrenciesTypes } = require('../models/CurrenciesTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await CurrenciesTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CurrenciesTypes.name.toUpperCase());
  }
};