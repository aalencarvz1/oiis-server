'use strict';

/*imports*/
const { MovementsEntitiesRelationshipsTypes } = require('../models/MovementsEntitiesRelationshipsTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MovementsEntitiesRelationshipsTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MovementsEntitiesRelationshipsTypes.name.toUpperCase());
  }
};