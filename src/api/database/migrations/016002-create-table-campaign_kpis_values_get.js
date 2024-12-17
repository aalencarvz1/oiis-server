'use strict';

/*imports*/
const { Campaign_Kpis_Values_Getters } = require('../models/Campaigns_kpi_value_getters');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpis_Values_Getters.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpis_Values_Getters.tableName);
  }
};