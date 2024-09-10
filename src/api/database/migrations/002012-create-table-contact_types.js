'use strict';

/*imports*/
const { Contact_Types } = require('../models/Contact_Types');
/** @type {import('sequelize-cli').Migration} */


/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Contact_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Contact_Types.tableName);
  }
};