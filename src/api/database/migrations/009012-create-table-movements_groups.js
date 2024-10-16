'use strict';

/*imports*/
const { Movements_Groups } = require('../models/Movements_Groups');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movements_Groups.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movements_Groups.tableName);
  }
};