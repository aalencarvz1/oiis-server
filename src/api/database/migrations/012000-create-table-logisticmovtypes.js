'use strict';

/*imports*/
const { LogisticMovTypes } = require('../models/LogisticMovTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticMovTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticMovTypes.name.toLowerCase());    
  }
};