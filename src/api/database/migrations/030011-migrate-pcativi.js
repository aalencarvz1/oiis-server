'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcAtivi } = require('../models/winthor/PcAtivi');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await PcAtivi.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcAtivi.name.toUpperCase());
  }
};