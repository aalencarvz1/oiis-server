'use strict';

/*imports*/
const { PostalCodes } = require('../models/PostalCodes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PostalCodes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PostalCodes.name.toUpperCase());
  }
};