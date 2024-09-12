'use strict';

/*imports*/
const { Logistic_Reasons } = require('../models/Logistic_Reasons');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Reasons.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Reasons.tableName);    
  }
};