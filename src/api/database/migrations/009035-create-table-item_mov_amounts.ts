'use strict';

import { QueryInterface } from 'sequelize';
import  Item_Mov_Amounts  from '../models/Item_Mov_Amounts.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Item_Mov_Amounts.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Item_Mov_Amounts.tableName);
  }
};