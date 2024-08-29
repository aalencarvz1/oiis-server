'use strict';

/*imports*/
const { PcEmpr } = require('../models/winthor/PcEmpr');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcEmpr.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    a//wait queryInterface.dropTable(PcEmpr.name.toUpperCase());
  }
};