'use strict';

/*imports*/
const { Entities_Types } = require('../models/Entities_Types');
const { Tables } = require('../models/Tables');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Entities_Types.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});   
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Tables);                
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Entities_Types.tableName);
  }
};