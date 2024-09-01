'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcVeicul } = require('../models/winthor/PcVeicul');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await PcVeicul.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcVeicul.name.toUpperCase());
  }
};