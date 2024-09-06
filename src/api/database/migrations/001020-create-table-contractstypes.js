'use strict';

/*imports*/
const { ContractsTypes } = require('../models/ContractsTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ContractsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ContractsTypes.name.toLowerCase());
  }
};