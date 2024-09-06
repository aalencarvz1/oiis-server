'use strict';

/*imports*/
const { AddressTypes } = require('../models/AddressTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await AddressTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(AddressTypes.tableName);
  }
};