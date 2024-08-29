'use strict';

/*imports*/
const { PcNfsaid } = require('../models/winthor/PcNfsaid');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcNfsaid.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcNfsaid.name.toUpperCase());
  }
};