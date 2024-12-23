'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { Integration_Tables } = require('../models/winthor_integration/Integration_Tables');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {  
      await Integration_Tables.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Integration_Tables.runDownMigration(queryInterface);         
    }
  }
};