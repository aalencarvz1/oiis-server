'use strict';

/*imports*/
const { ApisRequestsCalls } = require('../models/ApisRequestsCalls');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ApisRequestsCalls.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ApisRequestsCalls.name.toLowerCase());
  }
};