'use strict';

/*imports*/
const { Postal_Codes_X_Streets } = require('../models/Postal_Codes_X_Streets');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Postal_Codes_X_Streets.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Postal_Codes_X_Streets.tableName);
  }
};