'use strict';

/*imports*/
const { Warehouse_Address_Capacities } = require('../models/Warehouse_Address_Capacities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Warehouse_Address_Capacities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Warehouse_Address_Capacities.tableName);
  }
};