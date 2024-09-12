'use strict';

/*imports*/
const { Financial_Value_Forms } = require('../models/Financial_Value_Forms');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Financial_Value_Forms.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Financial_Value_Forms.tableName);
  }
};