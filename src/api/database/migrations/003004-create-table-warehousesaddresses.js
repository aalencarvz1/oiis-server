'use strict';

/*imports*/
const { WarehousesAddresses } = require('../models/WarehousesAddresses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await WarehousesAddresses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(WarehousesAddresses.name.toUpperCase());
  }
};