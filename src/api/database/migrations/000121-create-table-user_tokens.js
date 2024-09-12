'use strict';

/*imports*/
const { User_Tokens } = require('../models/User_Tokens');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await User_Tokens.runUpMigration(queryInterface);           
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(User_Tokens.tableName);
  }
};