'use strict';

/*imports*/
const { Api_Responses } = require('../models/Api_Responses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Api_Responses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Api_Responses.tableName);
  }
};