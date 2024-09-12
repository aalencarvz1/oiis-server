'use strict';

/*imports*/
const { Postal_Codes } = require('../models/Postal_Codes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Postal_Codes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Postal_Codes.tableName);
  }
};