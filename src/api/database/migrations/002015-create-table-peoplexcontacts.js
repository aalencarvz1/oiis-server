'use strict';

/*imports*/
const { PeopleXContacts } = require('../models/PeopleXContacts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PeopleXContacts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PeopleXContacts.name.toUpperCase());
  }
};