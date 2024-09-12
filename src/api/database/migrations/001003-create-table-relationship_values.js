'use strict';

/*imports*/
const { Relationship_Values } = require('../models/Relationship_Values');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Relationship_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Relationship_Values.tableName);
  }
};