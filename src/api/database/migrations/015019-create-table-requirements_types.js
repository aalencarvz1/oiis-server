'use strict';

/*imports*/
const { Requirements_Types } = require('../models/Requirements_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Requirements_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Requirements_Types.tableName);
  }
};