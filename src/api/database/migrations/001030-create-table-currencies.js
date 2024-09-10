'use strict';

/*imports*/
const { Currencies } = require('../models/Currencies');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Currencies.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Currencies.tableName);
  }
};