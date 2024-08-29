'use strict';

/*imports*/
const { PcPrest } = require('../models/winthor/PcPrest');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcPrest.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcPrest.name.toUpperCase());
  }
};