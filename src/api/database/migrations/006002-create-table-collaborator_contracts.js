'use strict';

/*imports*/
const { Collaborator_Contracts } = require('../models/Collaborator_Contracts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Collaborator_Contracts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Collaborator_Contracts.tableName);
  }
};