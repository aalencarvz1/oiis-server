'use strict';

/*imports*/
const { FinancialValueLocalizationsTypes } = require('../models/FinancialValueLocalizationsTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await FinancialValueLocalizationsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(FinancialValueLocalizationsTypes.name.toLowerCase());
  }
};