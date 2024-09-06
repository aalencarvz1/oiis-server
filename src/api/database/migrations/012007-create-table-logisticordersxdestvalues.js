'use strict';

/*imports*/
const { LogisticOrdersXDestValues } = require('../models/LogisticOrdersXDestValues');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticOrdersXDestValues.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticOrdersXDestValues.name.toLowerCase());    
  }
};