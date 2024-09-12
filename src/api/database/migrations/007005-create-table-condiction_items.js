'use strict';

/*imports*/
const { Condiction_Items } = require('../models/Condiction_Items');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Condiction_Items.runUpMigration(queryInterface);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Condiction_Items.tableName);
  }
};