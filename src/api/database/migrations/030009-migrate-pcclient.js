'use strict';

/*imports*/
const { PcClient } = require('../models/winthor/PcClient');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcClient.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcClient.name.toUpperCase());
  }
};