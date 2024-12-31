'use strict';


import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  PcPixCobrancaDados  from '../models/winthor/PcPixCobrancaDados.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await PcPixCobrancaDados.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    //await queryInterface.dropTable(PcPixCobrancaDados.tableName);
  }
};