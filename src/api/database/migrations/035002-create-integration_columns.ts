'use strict';

import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  Integration_Columns  from '../models/winthor_integration/Integration_Columns.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) === true) {
      await Integration_Columns.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) === true) {
      await Integration_Columns.runDownMigration(queryInterface);         
    }
  }
};