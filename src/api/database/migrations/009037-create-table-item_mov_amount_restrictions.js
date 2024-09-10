'use strict';

/*imports*/
const { Item_Mov_Amount_Restrictions } = require('../models/Item_Mov_Amount_Restrictions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_Mov_Amount_Restrictions.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_Mov_Amount_Restrictions.tableName);
  }
};