'use strict';

/*imports*/
const { Conteiner_Type_Capacities } = require('../models/Conteiner_Type_Capacities');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Conteiner_Type_Capacities.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Conteiner_Type_Capacities.tableName);
  }
};