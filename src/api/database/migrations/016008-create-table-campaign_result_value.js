'use strict';

/*imports*/
const { Campaign_Entites_Kpi_Result_Values } = require('../models/Campaign_entities_kpi_result_values');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Entites_Kpi_Result_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Entites_Kpi_Result_Values.tableName);
  }
};