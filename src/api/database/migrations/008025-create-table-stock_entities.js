'use strict';

/*imports*/
const { Stock_Entities } = require('../models/Stock_Entities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Stock_Entities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Stock_Entities.tableName);
  }
};