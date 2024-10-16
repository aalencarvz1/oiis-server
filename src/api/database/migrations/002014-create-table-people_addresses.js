'use strict';

/*imports*/
const { People_Addresses } = require('../models/People_Addresses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await People_Addresses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(People_Addresses.tableName);
  }
};