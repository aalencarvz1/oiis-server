'use strict';

/*imports*/
const { Streets } = require('../models/Streets');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Streets.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Streets.name.toLowerCase());
  }
};