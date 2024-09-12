'use strict';

/*imports*/
const { Logistic_Orders_X_Movs } = require('../models/Logistic_Orders_X_Movs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Orders_X_Movs.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Orders_X_Movs.tableName);    
  }
};