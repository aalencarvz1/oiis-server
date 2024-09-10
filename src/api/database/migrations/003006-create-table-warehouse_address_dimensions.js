'use strict';

/*imports*/
const { Warehouse_Address_Dimensions } = require('../models/Warehouse_Address_Dimensions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Warehouse_Address_Dimensions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Warehouse_Address_Dimensions.tableName);
  }
};