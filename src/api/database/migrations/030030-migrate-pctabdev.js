'use strict';

/*imports*/
const { PcTabDev } = require('../models/winthor/PcTabDev');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcTabDev.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcTabDev.name.toUpperCase());
  }
};