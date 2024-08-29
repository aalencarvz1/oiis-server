'use strict';

/*imports*/
const { StreetTypes } = require('../models/StreetTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await StreetTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StreetTypes.name.toUpperCase());
  }
};