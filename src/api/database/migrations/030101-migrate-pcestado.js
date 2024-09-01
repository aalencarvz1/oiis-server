'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcEstado } = require('../models/winthor/PcEstado');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      await PcEstado.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcEstado.name.toUpperCase());
  }
};