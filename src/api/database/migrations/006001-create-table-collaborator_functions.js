'use strict';

/*imports*/
const { Collaborator_Functions } = require('../models/Collaborator_Functions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Collaborator_Functions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Collaborator_Functions.tableName);
  }
};