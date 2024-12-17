'use strict';

/*imports*/
const { Campaign_Kpi_Result_Value } = require('../models/Campaigns_kpi_result_values');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpi_Result_Value.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpi_Result_Value.tableName);
  }
};