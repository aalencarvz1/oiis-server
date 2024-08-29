'use strict';

/*imports*/
const { PcCarreg } = require('../models/winthor/PcCarreg');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcCarreg.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcCarreg.name.toUpperCase());
  }
};