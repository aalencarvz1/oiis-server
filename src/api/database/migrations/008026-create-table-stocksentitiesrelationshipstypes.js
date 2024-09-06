'use strict';

/*imports*/
const { StocksEntitiesRelationshipsTypes } = require('../models/StocksEntitiesRelationshipsTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await StocksEntitiesRelationshipsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StocksEntitiesRelationshipsTypes.name.toLowerCase());
  }
};