'use strict';

/*imports*/
const { CollaboratorsFunctions } = require('../models/CollaboratorsFunctions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await CollaboratorsFunctions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CollaboratorsFunctions.name.toUpperCase());
  }
};