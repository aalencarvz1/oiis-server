'use strict';

/*imports*/
const { Campaign_Kpi_Value_Detail_Entities } = require('../models/Campaign_Kpi_Value_Detail_Entities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpi_Value_Detail_Entities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpi_Value_Detail_Entities.tableName);
  }
};