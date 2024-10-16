'use strict';

/*imports*/
const { Logistic_Orders_Dest_Values } = require('../models/Logistic_Orders_Dest_Values');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Orders_Dest_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Orders_Dest_Values.tableName);    
  }
};