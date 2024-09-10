'use strict';

/*imports*/
const { Movements_X_Entities } = require('../models/Movements_X_Entities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movements_X_Entities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movements_X_Entities.tableName);
  }
};