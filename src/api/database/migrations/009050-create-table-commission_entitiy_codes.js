'use strict';

/*imports*/
const { Commission_Entitiy_Codes } = require('../models/Commission_Entitiy_Codes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Commission_Entitiy_Codes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Commission_Entitiy_Codes.tableName);
  }
};