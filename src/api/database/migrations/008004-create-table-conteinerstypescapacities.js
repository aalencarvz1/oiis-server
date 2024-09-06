'use strict';

/*imports*/
const { ConteinersTypesCapacities } = require('../models/ConteinersTypesCapacities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ConteinersTypesCapacities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ConteinersTypesCapacities.name.toLowerCase());
  }
};