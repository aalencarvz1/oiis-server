'use strict';

/*imports*/
const { Campaign_Kpi_Value_Periods } = require('../models/Campaign_kpi_value_periods');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpi_Value_Periods.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpi_Value_Periods.tableName);
  }
};