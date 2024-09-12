'use strict';

/*imports*/
const { Conteiner_Types } = require('../models/Conteiner_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Conteiner_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Conteiner_Types.tableName);
  }
};