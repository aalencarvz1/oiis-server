'use strict';

/*imports*/
const { ConteinersTypesDimensions } = require('../models/ConteinersTypesDimensions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ConteinersTypesDimensions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ConteinersTypesDimensions.name.toUpperCase());
  }
};