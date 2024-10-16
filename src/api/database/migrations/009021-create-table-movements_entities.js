'use strict';

/*imports*/
const { Movements_Entities } = require('../models/Movements_Entities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movements_Entities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movements_Entities.tableName);
  }
};