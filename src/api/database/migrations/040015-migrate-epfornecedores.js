'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { EpFornecedores } = require('../models/ep/EpFornecedores');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.EP_INTEGRATE) == true) {
      await EpFornecedores.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpFornecedores.name.toUpperCase());
  }
};