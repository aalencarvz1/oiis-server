'use strict';

/*imports*/
const { UsersProfilesTimesWork } = require('../models/UsersProfilesTimesWork');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await UsersProfilesTimesWork.runUpMigration(queryInterface);           
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(UsersProfilesTimesWork.name.toLowerCase());
  }
};