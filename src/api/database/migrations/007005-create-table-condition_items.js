'use strict';

/*imports*/
const { Condition_Items } = require('../models/Condition_Items');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Condition_Items.runUpMigration(queryInterface);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Condition_Items.tableName);
  }
};