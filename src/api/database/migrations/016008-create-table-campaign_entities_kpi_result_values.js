'use strict';

/*imports*/
const { Campaign_Entities_Kpi_Result_Values } = require('../models/Campaign_Entities_Kpi_Result_Values');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Entities_Kpi_Result_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Entities_Kpi_Result_Values.tableName);
  }
};