'use strict';

/*imports*/
const { Campaign_Kpis_Values_Detail } = require('../models/Campaigns_kpi_value_detail');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpis_Values_Detail.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpis_Values_Detail.tableName);
  }
};