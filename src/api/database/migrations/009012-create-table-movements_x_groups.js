'use strict';

/*imports*/
const { Movements_X_Groups } = require('../models/Movements_X_Groups');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movements_X_Groups.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movements_X_Groups.tableName);
  }
};