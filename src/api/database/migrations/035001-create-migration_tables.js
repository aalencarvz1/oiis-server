'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { Migration_Tables } = require('../models/winthor_integration/Migration_Tables');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {  
      await Migration_Tables.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Migration_Tables.runDownMigration(queryInterface);         
    }
  }
};