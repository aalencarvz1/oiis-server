'use strict';

/*imports*/
const { Campaign_Kpis_Value_Periods } = require('../models/Campaigns_kpi_value_periods');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpis_Value_Periods.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpis_Value_Periods.tableName);
  }
};