'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { EpMovimentacoesEnt } = require('../models/ep/EpMovimentacoesEnt');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.EP_INTEGRATE) == true) {
      await EpMovimentacoesEnt.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpMovimentacoesEnt.name.toUpperCase());
  }
};