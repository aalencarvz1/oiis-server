'use strict';

/*imports*/
const { NeighborHoods } = require('../models/NeighborHoods');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await NeighborHoods.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(NeighborHoods.tableName);
  }
};