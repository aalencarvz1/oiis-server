'use strict';

/*imports*/
const { Item_Meas_Pack_Identif } = require('../models/Item_Meas_Pack_Identif');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_Meas_Pack_Identif.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_Meas_Pack_Identif.tableName);
  }
};