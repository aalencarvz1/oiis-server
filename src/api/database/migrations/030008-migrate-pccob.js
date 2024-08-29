'use strict';

/*imports*/
const { PcCob } = require('../models/winthor/PcCob');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcCob.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcCob.name.toUpperCase());
  }
};