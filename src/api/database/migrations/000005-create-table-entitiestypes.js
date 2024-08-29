'use strict';

/*imports*/
const { EntitiesTypes } = require('../models/EntitiesTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await EntitiesTypes.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(EntitiesTypes.name.toUpperCase());
  }
};