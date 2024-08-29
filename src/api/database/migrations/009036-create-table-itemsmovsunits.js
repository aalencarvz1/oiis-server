'use strict';

/*imports*/
const { ItemsMovsUnits } = require('../models/ItemsMovsUnits');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsMovsUnits.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsMovsUnits.name.toUpperCase());
  }
};