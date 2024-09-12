'use strict';

/*imports*/
const { Packs_X_Packs_Origins } = require('../models/Packs_X_Packs_Origins');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Packs_X_Packs_Origins.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Packs_X_Packs_Origins.tableName);
  }
};