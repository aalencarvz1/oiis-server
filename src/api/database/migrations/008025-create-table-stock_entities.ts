'use strict';

import { QueryInterface } from 'sequelize';
import  Stock_Entities  from '../models/Stock_Entities.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Stock_Entities.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Stock_Entities.tableName);
  }
};