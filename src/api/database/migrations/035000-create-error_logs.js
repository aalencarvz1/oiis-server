'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { Error_Logs } = require('../models/winthor_integration/Error_Logs');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Error_Logs.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Error_Logs.runDownMigration(queryInterface);         
    }
  }
};