'use strict';

/*imports*/
const { PcEstcr } = require('../models/winthor/PcEstcr');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcEstcr.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcEstcr.name.toUpperCase());
  }
};