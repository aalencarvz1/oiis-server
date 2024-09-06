'use strict';

const { ModelsController } = require('../../controllers/database/ModelsController');
/*imports*/
const { DataTables } = require('../models/DataTables');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    ModelsController.adjustModelsCycleImport();
    await DataTables.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataTables.name.toLowerCase());
  }
};