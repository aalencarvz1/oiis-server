'use strict';

/*imports*/
const { Gtin_Types } = require('../models/Gtin_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Gtin_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Gtin_Types.tableName);
  }
};