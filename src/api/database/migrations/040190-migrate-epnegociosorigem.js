'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { EpNegociosOrigem } = require('../models/ep/EpNegociosOrigem');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.EP_INTEGRATE) == true) {
      await EpNegociosOrigem.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpNegociosOrigem.name.toUpperCase());
  }
};