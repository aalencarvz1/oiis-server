'use strict';

/*imports*/
const { PcCidade } = require('../models/winthor/PcCidade');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcCidade.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcCidade.name.toUpperCase());
  }
};