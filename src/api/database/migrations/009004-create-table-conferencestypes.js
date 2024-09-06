'use strict';

/*imports*/
const { ConferencesTypes } = require('../models/ConferencesTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ConferencesTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ConferencesTypes.tableName);
  }
};