'use strict';

/*imports*/
const { Campaign_Kpi_Value_Detail } = require('../models/Campaign_kpi_value_detail');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpi_Value_Detail.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpi_Value_Detail.tableName);
  }
};