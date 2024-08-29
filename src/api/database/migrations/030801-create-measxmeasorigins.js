'use strict';

/*imports*/
const { MeasXMeasOrigins } = require('../models/MeasXMeasOrigins');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MeasXMeasOrigins.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MeasXMeasOrigins.name.toUpperCase());
  }
};