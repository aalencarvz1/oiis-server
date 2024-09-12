'use strict';

/*imports*/
const { Maps_Api_Responses } = require('../models/Maps_Api_Responses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Maps_Api_Responses.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Maps_Api_Responses.tableName);
  }
};