'use strict';

/*imports*/
const { PcDocEletronico } = require('../models/winthor/PcDocEletronico');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcDocEletronico.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcDocEletronico.name.toUpperCase());
  }
};