'use strict';

const { MigrationsTables } = require('../models/winthor_integration/MigrationsTables');

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MigrationsTables.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await MigrationsTables.runDownMigration(queryInterface);         
  }
};