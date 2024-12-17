'use strict';

/*imports*/
const { Campaigns } = require('../models/Campaigns');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Campaigns.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Campaigns.tableName);
  }
};