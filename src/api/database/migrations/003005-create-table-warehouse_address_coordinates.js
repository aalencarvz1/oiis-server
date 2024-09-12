'use strict';

/*imports*/
const { Warehouse_Address_Coordinates } = require('../models/Warehouse_Address_Coordinates');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Warehouse_Address_Coordinates.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Warehouse_Address_Coordinates.tableName);
  }
};