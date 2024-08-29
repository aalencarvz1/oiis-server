'use strict';

/*imports*/
const { WarehousesAddressesDimensions } = require('../models/WarehousesAddressesDimensions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await WarehousesAddressesDimensions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(WarehousesAddressesDimensions.name.toUpperCase());
  }
};