'use strict';

/*imports*/
const { PcPixCobrancaDados } = require('../models/winthor/PcPixCobrancaDados');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcPixCobrancaDados.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcPixCobrancaDados.name.toUpperCase());
  }
};