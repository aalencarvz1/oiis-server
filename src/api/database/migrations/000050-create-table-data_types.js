'use strict';

/*imports*/
const { Data_Types } = require('../models/Data_Types');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Data_Types.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                       
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Data_Types.tableName);
  }
};