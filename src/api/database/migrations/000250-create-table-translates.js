'use strict';

/*imports*/
const { Translates } = require('../models/Translates');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Translates.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Translates.name.toUpperCase());
  }
};