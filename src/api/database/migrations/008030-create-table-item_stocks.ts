'use strict';

import { QueryInterface } from 'sequelize';
import  Item_Stocks  from '../models/Item_Stocks.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Item_Stocks.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Item_Stocks.tableName);
  }
};