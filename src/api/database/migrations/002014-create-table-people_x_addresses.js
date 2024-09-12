'use strict';

/*imports*/
const { People_X_Addresses } = require('../models/People_X_Addresses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await People_X_Addresses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(People_X_Addresses.tableName);
  }
};