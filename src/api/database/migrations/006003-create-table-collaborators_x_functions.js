'use strict';

/*imports*/
const { Collaborators_X_Functions } = require('../models/Collaborators_X_Functions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Collaborators_X_Functions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Collaborators_X_Functions.tableName);
  }
};