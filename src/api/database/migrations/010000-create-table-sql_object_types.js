'use strict';

/*imports*/
const { Sql_Object_Types } = require('../models/Sql_Object_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Sql_Object_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Sql_Object_Types.tableName);
  }
};