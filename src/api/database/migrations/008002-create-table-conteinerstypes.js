'use strict';

/*imports*/
const { ConteinersTypes } = require('../models/ConteinersTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ConteinersTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ConteinersTypes.name.toLowerCase());
  }
};