'use strict';

/*imports*/
const { Logistic_Status } = require('../models/Logistic_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Status.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Status.tableName);    
  }
};