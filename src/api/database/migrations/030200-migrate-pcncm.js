'use strict';

/*imports*/
const { PcNcm } = require('../models/winthor/PcNcm');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcNcm.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcNcm.name.toUpperCase());
  }
};