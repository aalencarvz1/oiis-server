'use strict';

/*imports*/
const { Conteiners } = require('../models/Conteiners');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Conteiners.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Conteiners.tableName);
  }
};