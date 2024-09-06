'use strict';

/*imports*/
const { PostalCodesXStreets } = require('../models/PostalCodesXStreets');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PostalCodesXStreets.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PostalCodesXStreets.tableName);
  }
};