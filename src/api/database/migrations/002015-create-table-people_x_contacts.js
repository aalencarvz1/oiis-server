'use strict';

/*imports*/
const { People_X_Contacts } = require('../models/People_X_Contacts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await People_X_Contacts.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(People_X_Contacts.tableName);
  }
};