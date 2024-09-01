'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcCob } = require('../models/winthor/PcCob');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await PcCob.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcCob.name.toUpperCase());
  }
};