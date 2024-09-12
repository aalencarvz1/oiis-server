'use strict';

/*imports*/
const { User_Profile_Timeworks } = require('../models/User_Profile_Timeworks');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await User_Profile_Timeworks.runUpMigration(queryInterface);           
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(User_Profile_Timeworks.tableName);
  }
};