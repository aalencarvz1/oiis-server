'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcPrest } = require('../models/winthor/PcPrest');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await PcPrest.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcPrest.tableName);
  }
};