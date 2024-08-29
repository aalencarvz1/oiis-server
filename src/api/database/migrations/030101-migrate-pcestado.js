'use strict';

/*imports*/
const { PcEstado } = require('../models/winthor/PcEstado');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PcEstado.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcEstado.name.toUpperCase());
  }
};