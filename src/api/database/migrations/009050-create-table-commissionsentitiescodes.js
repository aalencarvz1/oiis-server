'use strict';

/*imports*/
const { CommissionsEntitiesCodes } = require('../models/CommissionsEntitiesCodes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await CommissionsEntitiesCodes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CommissionsEntitiesCodes.name.toUpperCase());
  }
};