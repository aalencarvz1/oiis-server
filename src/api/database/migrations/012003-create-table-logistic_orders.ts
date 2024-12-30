'use strict';

import { QueryInterface } from 'sequelize';
import  Logistic_Orders  from '../models/Logistic_Orders.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Logistic_Orders.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logistic_Orders.tableName);    
  }
};