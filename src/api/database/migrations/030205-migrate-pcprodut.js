'use strict';

/*imports*/
const { PcProdut } = require('../models/winthor/PcProdut');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcProdut.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //wait queryInterface.dropTable(PcProdut.name.toUpperCase());
  }
};