'use strict';

/*imports*/
const { Logistic_Orders_Movs_Received_Values } = require('../models/Logistic_Orders_Movs_Received_Values');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Orders_Movs_Received_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Orders_Movs_Received_Values.tableName);    
  }
};