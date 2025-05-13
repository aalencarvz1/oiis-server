'use strict';


import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  PcSecao  from '../models/winthor/PcSecao.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) === true) {
      await PcSecao.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    //wait queryInterface.dropTable(PcSecao.tableName);
  }
};