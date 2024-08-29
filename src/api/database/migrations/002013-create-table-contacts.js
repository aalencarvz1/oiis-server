'use strict';

/*imports*/
const { Contacts } = require('../models/Contacts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Contacts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Contacts.name.toUpperCase());
  }
};