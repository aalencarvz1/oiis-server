'use strict';

/*imports*/
const { Routine_Types } = require('../models/Routine_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Routine_Types.runUpMigration(queryInterface);             
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Routine_Types.tableName);
  }
};