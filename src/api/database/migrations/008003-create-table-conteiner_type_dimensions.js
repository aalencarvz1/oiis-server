'use strict';

/*imports*/
const { Conteiner_Type_Dimensions } = require('../models/Conteiner_Type_Dimensions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Conteiner_Type_Dimensions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Conteiner_Type_Dimensions.tableName);
  }
};