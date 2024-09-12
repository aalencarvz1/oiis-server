'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { Migration_Control } = require('../models/winthor_integration/Migration_Control');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Migration_Control.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Migration_Control.runDownMigration(queryInterface);         
    }
  }
};