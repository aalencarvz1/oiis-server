'use strict';

/*imports*/
const { Apis } = require('../models/Apis');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Apis.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Apis.name.toLowerCase());
  }
};