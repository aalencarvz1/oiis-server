'use strict';

/*imports*/
const { Campaign_Kpi_Result_Values } = require('../models/Campaign_kpi_result_values');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpi_Result_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpi_Result_Values.tableName);
  }
};