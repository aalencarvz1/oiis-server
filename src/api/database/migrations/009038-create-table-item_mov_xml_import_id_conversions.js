'use strict';

/*imports*/
const { Item_Mov_Xml_Import_Id_Conversions } = require('../models/Item_Mov_Xml_Import_Id_Conversions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_Mov_Xml_Import_Id_Conversions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_Mov_Xml_Import_Id_Conversions.tableName);
  }
};