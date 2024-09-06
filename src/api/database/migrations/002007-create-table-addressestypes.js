'use strict';

/*imports*/
const { AddressesTypes } = require('../models/AddressesTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await AddressesTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(AddressesTypes.name.toLowerCase());
  }
};