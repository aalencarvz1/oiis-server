'use strict';

/*imports*/
const { Groups } = require('../models/Groups');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Groups.runUpMigration(queryInterface);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Groups.tableName);
  }
};