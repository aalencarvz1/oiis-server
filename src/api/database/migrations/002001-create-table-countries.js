'use strict';

/*imports*/
const { Countries } = require('../models/Countries');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Countries.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Countries.name.toLowerCase());
  }
};