'use strict';

/*imports*/
const { ItemsMovsXMLImportIdsConversions } = require('../models/ItemsMovsXMLImportIdsConversions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsMovsXMLImportIdsConversions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsMovsXMLImportIdsConversions.tableName);
  }
};