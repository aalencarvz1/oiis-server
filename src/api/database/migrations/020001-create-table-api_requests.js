'use strict';

/*imports*/
const { Api_Requests } = require('../models/Api_Requests');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Api_Requests.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Api_Requests.tableName);
  }
};