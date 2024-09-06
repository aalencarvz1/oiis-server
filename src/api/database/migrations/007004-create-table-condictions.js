'use strict';

/*imports*/
const { Condictions } = require('../models/Condictions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Condictions.runUpMigration(queryInterface);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Condictions.tableName);
  }
};