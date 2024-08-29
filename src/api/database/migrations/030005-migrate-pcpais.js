'use strict';

/*imports*/
const { PcPais } = require('../models/winthor/PcPais');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcPais.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcPais.name.toUpperCase());
  }
};