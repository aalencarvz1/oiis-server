'use strict';

/*imports*/
const { Campaign_Kpis } = require('../models/Campaigns_kpis');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaign_Kpis.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaign_Kpis.tableName);
  }
};