'use strict';

/*imports*/
const { PeopleXAddresses } = require('../models/PeopleXAddresses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PeopleXAddresses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PeopleXAddresses.name.toLowerCase());
  }
};