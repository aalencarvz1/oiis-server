'use strict';

/*imports*/
const { Warehouse_Addresses } = require('../models/Warehouse_Addresses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Warehouse_Addresses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Warehouse_Addresses.tableName);
  }
};