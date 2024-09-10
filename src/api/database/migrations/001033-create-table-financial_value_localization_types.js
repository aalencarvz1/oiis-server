'use strict';

/*imports*/
const { Financial_Value_Localization_Types } = require('../models/Financial_Value_Localization_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Financial_Value_Localization_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Financial_Value_Localization_Types.tableName);
  }
};