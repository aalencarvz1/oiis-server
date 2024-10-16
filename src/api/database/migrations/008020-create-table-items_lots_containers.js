'use strict';

/*imports*/
const { Items_Lots_Containers } = require('../models/Items_Lots_Containers');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Items_Lots_Containers.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Items_Lots_Containers.tableName);
  }
};