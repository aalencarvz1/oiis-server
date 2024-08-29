'use strict';

/*imports*/
const { PostalCodesXPaths } = require('../models/PostalCodesXPaths');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PostalCodesXPaths.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PostalCodesXPaths.name.toUpperCase());
  }
};