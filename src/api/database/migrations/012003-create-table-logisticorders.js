'use strict';

/*imports*/
const { LogisticOrders } = require('../models/LogisticOrders');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticOrders.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticOrders.name.toLowerCase());    
  }
};