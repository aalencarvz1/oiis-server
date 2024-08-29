'use strict';

const { MigrationsControl } = require('../models/winthor_integration/MigrationsControl');

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MigrationsControl.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await MigrationsControl.runDownMigration(queryInterface);         
  }
};