'use strict';

/*imports*/
const { FormsTypes } = require('../models/FormsTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await FormsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(FormsTypes.tableName);
  }
};