'use strict';



/*imports*/
const { EpFiliais } = require('../models/ep/EpFiliais');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EpFiliais.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpFiliais.name.toUpperCase());
  }
};