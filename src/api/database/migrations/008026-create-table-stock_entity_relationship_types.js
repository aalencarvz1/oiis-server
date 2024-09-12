'use strict';

/*imports*/
const { Stock_Entity_Relationship_Types } = require('../models/Stock_Entity_Relationship_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Stock_Entity_Relationship_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Stock_Entity_Relationship_Types.tableName);
  }
};