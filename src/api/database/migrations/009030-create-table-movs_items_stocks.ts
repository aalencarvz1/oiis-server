'use strict';

import { QueryInterface } from 'sequelize';
import  Movs_Items_Stocks  from '../models/Movs_Items_Stocks.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Movs_Items_Stocks.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Movs_Items_Stocks.tableName);
  }
};