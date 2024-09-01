'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { MigrationsTables } = require('../models/winthor_integration/MigrationsTables');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {  
      await MigrationsTables.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await MigrationsTables.runDownMigration(queryInterface);         
    }
  }
};