'use strict';

/*imports*/
const { Warehouse_Address_Types } = require('../models/Warehouse_Address_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Warehouse_Address_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Warehouse_Address_Types.tableName);
  }
};