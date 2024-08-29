'use strict';

/*imports*/
const { PcConsum } = require('../models/winthor/PcConsum');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcConsum.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcConsum.name.toUpperCase());
  }
};