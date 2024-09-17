'use strict';

/*imports*/
const { Container_Type_Capacities } = require('../models/Container_Type_Capacities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Container_Type_Capacities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Container_Type_Capacities.tableName);
  }
};