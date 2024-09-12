'use strict';

/*imports*/
const { Logistic_Orders } = require('../models/Logistic_Orders');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Orders.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Orders.tableName);    
  }
};