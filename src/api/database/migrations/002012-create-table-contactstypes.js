'use strict';

/*imports*/
const { ContactsTypes } = require('../models/ContactsTypes');
/** @type {import('sequelize-cli').Migration} */


/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ContactsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ContactsTypes.tableName);
  }
};