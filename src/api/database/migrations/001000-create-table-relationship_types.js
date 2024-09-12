'use strict';

/*imports*/
const { Relationship_Types } = require('../models/Relationship_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Relationship_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Relationship_Types.tableName);
  }
};