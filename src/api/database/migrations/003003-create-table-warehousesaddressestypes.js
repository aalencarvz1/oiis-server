'use strict';

/*imports*/
const { WarehousesAddressesTypes } = require('../models/WarehousesAddressesTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await WarehousesAddressesTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(WarehousesAddressesTypes.name.toUpperCase());
  }
};