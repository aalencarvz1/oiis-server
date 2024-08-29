'use strict';

/*imports*/
const { PcUsuari } = require('../models/winthor/PcUsuari');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcUsuari.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcUsuari.name.toUpperCase());
  }
};