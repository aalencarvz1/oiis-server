'use strict';

/*imports*/
const { Campaign_Kpi_Value_Getters } = require('../models/Campaign_kpi_value_getters');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpi_Value_Getters.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpi_Value_Getters.tableName);
  }
};