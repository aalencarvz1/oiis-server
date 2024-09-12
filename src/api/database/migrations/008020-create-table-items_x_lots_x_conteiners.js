'use strict';

/*imports*/
const { Items_X_Lots_X_Conteiners } = require('../models/Items_X_Lots_X_Conteiners');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Items_X_Lots_X_Conteiners.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Items_X_Lots_X_Conteiners.tableName);
  }
};