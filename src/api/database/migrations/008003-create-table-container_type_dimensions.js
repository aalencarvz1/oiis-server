'use strict';

/*imports*/
const { Container_Type_Dimensions } = require('../models/Container_Type_Dimensions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Container_Type_Dimensions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Container_Type_Dimensions.tableName);
  }
};