'use strict';

/*imports*/
const { FinancialValueMovTypes } = require('../models/FinancialValueMovTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await FinancialValueMovTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(FinancialValueMovTypes.name.toUpperCase());
  }
};