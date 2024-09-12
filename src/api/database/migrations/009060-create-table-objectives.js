'use strict';

/*imports*/
const { Objectives } = require('../models/Objectives');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Objectives.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Objectives.tableName);
  }
};