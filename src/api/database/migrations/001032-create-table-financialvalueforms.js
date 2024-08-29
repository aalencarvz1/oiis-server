'use strict';

/*imports*/
const { FinancialValueForms } = require('../models/FinancialValueForms');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await FinancialValueForms.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(FinancialValueForms.name.toUpperCase());
  }
};