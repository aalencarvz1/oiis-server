'use strict';

/*imports*/
const { PcFilial } = require('../models/winthor/PcFilial');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcFilial.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcFilial.name.toUpperCase());
  }
};