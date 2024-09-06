'use strict';

/*imports*/
const { WarehousesAddressTypes } = require('../models/WarehousesAddressTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await WarehousesAddressTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(WarehousesAddressTypes.tableName);
  }
};