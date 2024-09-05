'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { MigrationsColumns } = require('../models/winthor_integration/MigrationsColumns');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await MigrationsColumns.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await MigrationsColumns.runDownMigration(queryInterface);         
    }
  }
};