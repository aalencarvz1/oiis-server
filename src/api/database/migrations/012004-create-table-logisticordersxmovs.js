'use strict';

/*imports*/
const { LogisticOrdersXMovs } = require('../models/LogisticOrdersXMovs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticOrdersXMovs.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticOrdersXMovs.tableName);    
  }
};