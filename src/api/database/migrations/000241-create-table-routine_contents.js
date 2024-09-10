'use strict';

/*imports*/
const { Routine_Contents } = require('../models/Routine_Contents');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Routine_Contents.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Routine_Contents.tableName);
  }
};