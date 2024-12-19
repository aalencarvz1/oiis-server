'use strict';

/*imports*/
const { Campaign_Kpi_Value_Details } = require('../models/Campaign_Kpi_Value_Details');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpi_Value_Details.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpi_Value_Details.tableName);
  }
};