'use strict';

/*imports*/
const { Meas_X_Meas_Origins } = require('../models/Meas_X_Meas_Origins');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Meas_X_Meas_Origins.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Meas_X_Meas_Origins.tableName);
  }
};