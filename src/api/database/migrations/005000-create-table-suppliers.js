'use strict';

/*imports*/
const { Suppliers } = require('../models/Suppliers');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Suppliers.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Suppliers.tableName);
  }
};