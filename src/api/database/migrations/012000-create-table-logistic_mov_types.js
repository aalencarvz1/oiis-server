'use strict';

/*imports*/
const { Logistic_Mov_Types } = require('../models/Logistic_Mov_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Logistic_Mov_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logistic_Mov_Types.tableName);    
  }
};