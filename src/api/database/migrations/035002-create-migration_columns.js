'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { Migration_Columns } = require('../models/winthor_integration/Migration_Columns');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Migration_Columns.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Migration_Columns.runDownMigration(queryInterface);         
    }
  }
};