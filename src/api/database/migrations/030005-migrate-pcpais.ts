'use strict';


import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  PcPais  from '../models/winthor/PcPais.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await PcPais.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    //await queryInterface.dropTable(PcPais.tableName);
  }
};