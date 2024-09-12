'use strict';

/*imports*/
const { Logs } = require('../models/Logs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(Logs.tableName, Logs.fields);
    await Logs.migrateConstraints(queryInterface);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logs.tableName);
  }
};