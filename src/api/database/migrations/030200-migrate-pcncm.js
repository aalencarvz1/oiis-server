'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcNcm } = require('../models/winthor/PcNcm');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await PcNcm.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcNcm.name.toUpperCase());
  }
};