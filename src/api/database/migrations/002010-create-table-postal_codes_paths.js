'use strict';

/*imports*/
const { Postal_Codes_Paths } = require('../models/Postal_Codes_Paths');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Postal_Codes_Paths.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Postal_Codes_Paths.tableName);
  }
};