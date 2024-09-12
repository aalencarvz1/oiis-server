'use strict';

/*imports*/
const { Financial_Value_Mov_Types } = require('../models/Financial_Value_Mov_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Financial_Value_Mov_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Financial_Value_Mov_Types.tableName);
  }
};