'use strict';

/*imports*/
const { User_Timeworks } = require('../models/User_Timeworks');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await User_Timeworks.runUpMigration(queryInterface);           
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(User_Timeworks.tableName);
  }
};