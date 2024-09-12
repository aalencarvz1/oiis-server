'use strict';

/*imports*/
const { Logistic_Logs } = require('../models/Logistic_Logs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Logs.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Logs.tableName);    
  }
};