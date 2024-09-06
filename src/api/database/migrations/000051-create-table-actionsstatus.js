'use strict';

/*imports*/
const { ActionsStatus } = require('../models/ActionsStatus');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ActionsStatus.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                       
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ActionsStatus.name.toLowerCase());
  }
};