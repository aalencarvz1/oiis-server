'use strict';

/*imports*/
const { People_Contacts } = require('../models/People_Contacts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await People_Contacts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(People_Contacts.tableName);
  }
};