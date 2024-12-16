'use strict';

/*imports*/
const { Groups_Items } = require('../models/Groups_Items');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Groups_Items.runUpMigration(queryInterface);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Groups_Items.tableName);
  }
};