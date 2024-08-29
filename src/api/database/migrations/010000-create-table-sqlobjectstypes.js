'use strict';

/*imports*/
const { SqlObjectsTypes } = require('../models/SqlObjectsTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await SqlObjectsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(SqlObjectsTypes.name.toUpperCase());
  }
};