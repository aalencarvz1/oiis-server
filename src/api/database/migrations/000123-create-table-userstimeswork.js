'use strict';

/*imports*/
const { UsersTimesWork } = require('../models/UsersTimesWork');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await UsersTimesWork.runUpMigration(queryInterface);           
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(UsersTimesWork.name.toUpperCase());
  }
};