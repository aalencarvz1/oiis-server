'use strict';

/*imports*/
const { EpOrigensInfo } = require('../models/ep/EpOrigensInfo');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpOrigensInfo.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpOrigensInfo.name.toUpperCase());
  }
};