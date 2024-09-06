'use strict';

/*imports*/
const { ItemsMovsAmountsRestrictions } = require('../models/ItemsMovsAmountsRestrictions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsMovsAmountsRestrictions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsMovsAmountsRestrictions.name.toLowerCase());
  }
};