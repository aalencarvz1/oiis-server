'use strict';

/*imports*/
const { PacksXPacksOrigins } = require('../models/PacksXPacksOrigins');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PacksXPacksOrigins.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PacksXPacksOrigins.tableName);
  }
};