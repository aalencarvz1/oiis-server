'use strict';

/*imports*/
const { EpCidades } = require('../models/ep/EpCidades');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpCidades.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpCidades.name.toUpperCase());
  }
};