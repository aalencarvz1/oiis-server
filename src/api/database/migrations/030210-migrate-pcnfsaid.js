'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { PcNfsaid } = require('../models/winthor/PcNfsaid');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await PcNfsaid.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(PcNfsaid.tableName);
  }
};