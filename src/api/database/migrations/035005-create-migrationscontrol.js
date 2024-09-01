'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const { MigrationsControl } = require('../models/winthor_integration/MigrationsControl');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await MigrationsControl.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await MigrationsControl.runDownMigration(queryInterface);         
    }
  }
};