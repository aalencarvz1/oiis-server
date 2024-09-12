'use strict';

/*imports*/
const { Movement_Entity_Relationship_Types } = require('../models/Movement_Entity_Relationship_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movement_Entity_Relationship_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movement_Entity_Relationship_Types.tableName);
  }
};