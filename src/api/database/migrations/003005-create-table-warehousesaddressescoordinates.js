'use strict';

/*imports*/
const { WarehousesAddressesCoordinates } = require('../models/WarehousesAddressesCoordinates');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await WarehousesAddressesCoordinates.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(WarehousesAddressesCoordinates.name.toUpperCase());
  }
};