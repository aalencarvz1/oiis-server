'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const DBConnectionManager = require('../DBConnectionManager');
const { Integration_Control } = require('../models/winthor_integration/Integration_Control');
require('dotenv').config({ path: __dirname + "/../../../../.env" });

/*imports*/


/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Integration_Control.runUpMigration(queryInterface);   
      /*
      altered field to type string because unique is truncked to date
      let originQueryInterface = await DBConnectionManager.getWinthorIntegrationDBConnection().getQueryInterface();
      let query = `CREATE UNIQUE INDEX "${Integration_Control.tableName}_i1"  ON "${Integration_Control.tableName}"("integration_table_id", "register_id", to_char("integrated_at",'dd/mm/yyyy hh24:mi:ss.ff'))`;  
      await originQueryInterface.sequelize.query(query);*/
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Integration_Control.runDownMigration(queryInterface);         
    }
  }
};