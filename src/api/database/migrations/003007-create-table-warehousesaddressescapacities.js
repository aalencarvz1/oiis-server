'use strict';

/*imports*/
const { WarehousesAddressesCapacities } = require('../models/WarehousesAddressesCapacities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await WarehousesAddressesCapacities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(WarehousesAddressesCapacities.tableName);
  }
};