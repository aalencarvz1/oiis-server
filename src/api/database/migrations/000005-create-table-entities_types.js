'use strict';

/*imports*/
const { Entities_Types } = require('../models/Entities_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Entities_Types.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Entities_Types.tableName);
  }
};