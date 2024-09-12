'use strict';

/*imports*/
const { Relationships } = require('../models/Relationships');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Relationships.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Relationships.tableName);
  }
};