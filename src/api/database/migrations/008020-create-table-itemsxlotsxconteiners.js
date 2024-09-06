'use strict';

/*imports*/
const { ItemsXLotsXConteiners } = require('../models/ItemsXLotsXConteiners');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsXLotsXConteiners.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsXLotsXConteiners.tableName);
  }
};