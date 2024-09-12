'use strict';

/*imports*/
const { Item_X_Meas_X_Pack_X_Identif } = require('../models/Item_X_Meas_X_Pack_X_Identif');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Item_X_Meas_X_Pack_X_Identif.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Item_X_Meas_X_Pack_X_Identif.tableName);
  }
};