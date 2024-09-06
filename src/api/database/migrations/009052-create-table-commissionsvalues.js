'use strict';

/*imports*/
const { CommissionsValues } = require('../models/CommissionsValues');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await CommissionsValues.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CommissionsValues.name.toLowerCase());
  }
};