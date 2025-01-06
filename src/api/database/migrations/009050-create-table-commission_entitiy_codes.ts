'use strict';

import { QueryInterface } from 'sequelize';
import  Commission_Entitiy_Codes  from '../models/Commission_Entitiy_Codes.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Commission_Entitiy_Codes.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Commission_Entitiy_Codes.tableName);
  }
};