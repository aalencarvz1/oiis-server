'use strict';

const { MigrationsColumns } = require('../models/winthor_integration/MigrationsColumns');

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MigrationsColumns.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await MigrationsColumns.runDownMigration(queryInterface);         
  }
};