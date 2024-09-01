'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcPixCobrancaDados } = require('../models/winthor/PcPixCobrancaDados');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await PcPixCobrancaDados.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcPixCobrancaDados.name.toUpperCase());
  }
};