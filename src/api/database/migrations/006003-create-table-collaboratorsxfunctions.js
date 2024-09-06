'use strict';

/*imports*/
const { CollaboratorsXFunctions } = require('../models/CollaboratorsXFunctions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await CollaboratorsXFunctions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CollaboratorsXFunctions.name.toLowerCase());
  }
};