'use strict';

const { Project_Item_Origin_Types } = require('../models/Project_item_Origin_Types');

/*imports*/
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Project_Item_Origin_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Project_Item_Origin_Types.tableName);
  }
};