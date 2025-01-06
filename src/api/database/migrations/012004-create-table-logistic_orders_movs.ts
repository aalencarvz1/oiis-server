'use strict';

import { QueryInterface } from 'sequelize';
import  Logistic_Orders_Movs  from '../models/Logistic_Orders_Movs.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Logistic_Orders_Movs.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logistic_Orders_Movs.tableName);    
  }
};