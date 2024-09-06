'use strict';

/*imports*/
const { Ncms } = require('../models/Ncms');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Ncms.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Ncms.name.toLowerCase());
  }
};