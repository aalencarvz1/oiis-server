'use strict';

/*imports*/
const { PcAtivi } = require('../models/winthor/PcAtivi');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcAtivi.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcAtivi.name.toUpperCase());
  }
};