'use strict';

/*imports*/
const { EpNfsEnt } = require('../models/ep/EpNfsEnt');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpNfsEnt.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpNfsEnt.name.toUpperCase());
  }
};