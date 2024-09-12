'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcEstcr } = require('../models/winthor/PcEstcr');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await PcEstcr.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcEstcr.tableName);
  }
};