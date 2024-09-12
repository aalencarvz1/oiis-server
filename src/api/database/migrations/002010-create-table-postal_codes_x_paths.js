'use strict';

/*imports*/
const { Postal_Codes_X_Paths } = require('../models/Postal_Codes_X_Paths');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Postal_Codes_X_Paths.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Postal_Codes_X_Paths.tableName);
  }
};