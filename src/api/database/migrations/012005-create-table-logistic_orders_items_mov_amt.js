'use strict';

/*imports*/
const { Logistic_Orders_Items_Mov_Amt } = require('../models/Logistic_Orders_Items_Mov_Amt');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Orders_Items_Mov_Amt.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Orders_Items_Mov_Amt.tableName);    
  }
};