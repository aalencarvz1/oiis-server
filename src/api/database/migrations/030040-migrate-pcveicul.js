'use strict';

/*imports*/
const { PcVeicul } = require('../models/winthor/PcVeicul');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcVeicul.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcVeicul.name.toUpperCase());
  }
};