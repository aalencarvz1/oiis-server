'use strict';

const { ModelsController } = require('../../controllers/database/ModelsController');
/*imports*/
const { Tables } = require('../models/Tables');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    ModelsController.adjustModelsCycleImport();
    await Tables.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Tables.tableName);
  }
};