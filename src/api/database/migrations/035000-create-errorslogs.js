'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { ErrorsLogs } = require('../models/winthor_integration/ErrorsLogs');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await ErrorsLogs.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await ErrorsLogs.runDownMigration(queryInterface);         
    }
  }
};