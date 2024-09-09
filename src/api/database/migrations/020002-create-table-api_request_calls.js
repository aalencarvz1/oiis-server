'use strict';

/*imports*/
const { Api_Request_Calls } = require('../models/Api_Request_Calls');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Api_Request_Calls.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Api_Request_Calls.tableName);
  }
};