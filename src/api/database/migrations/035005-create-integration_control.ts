'use strict';

import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  Integration_Control  from '../models/winthor_integration/Integration_Control.js';




/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) === true) {
      await Integration_Control.runUpMigration(queryInterface);   
      /*
      altered field to type string because unique is truncked to date
      let originQueryInterface = await DBConnectionManager.getWinthorIntegrationDBConnection().getQueryInterface();
      let query = `CREATE UNIQUE INDEX "${Integration_Control.tableName}_i1"  ON "${Integration_Control.tableName}"("integration_table_id", "register_id", to_char("integrated_at",'dd/mm/yyyy hh24:mi:ss.ff'))`;  
      await originQueryInterface.sequelize.query(query);*/
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) === true) {
      await Integration_Control.runDownMigration(queryInterface);         
    }
  }
};