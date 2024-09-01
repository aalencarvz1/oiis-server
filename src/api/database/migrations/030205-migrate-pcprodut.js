'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcProdut } = require('../models/winthor/PcProdut');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await PcProdut.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //wait queryInterface.dropTable(PcProdut.name.toUpperCase());
  }
};