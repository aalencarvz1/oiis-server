'use strict';

/*imports*/
const { MovementsTypes } = require('../models/MovementsTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MovementsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MovementsTypes.tableName);
  }
};