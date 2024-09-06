'use strict';

/*imports*/
const { ApisRequests } = require('../models/ApisRequests');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ApisRequests.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ApisRequests.name.toLowerCase());
  }
};