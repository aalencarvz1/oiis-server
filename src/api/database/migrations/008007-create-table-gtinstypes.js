'use strict';

/*imports*/
const { GtinsTypes } = require('../models/GtinsTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await GtinsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(GtinsTypes.name.toLowerCase());
  }
};