'use strict';

import { QueryInterface } from 'sequelize';
import  Logistic_Orders_Items_Mov_Amt  from '../models/Logistic_Orders_Items_Mov_Amt.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Logistic_Orders_Items_Mov_Amt.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logistic_Orders_Items_Mov_Amt.tableName);    
  }
};