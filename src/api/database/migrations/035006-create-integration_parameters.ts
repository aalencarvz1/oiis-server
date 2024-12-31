'use strict';

import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  Integration_Parameters  from '../models/winthor_integration/Integration_Parameters.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Integration_Parameters.runUpMigration(queryInterface);     
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Integration_Parameters.runDownMigration(queryInterface);         
    }
  }
};