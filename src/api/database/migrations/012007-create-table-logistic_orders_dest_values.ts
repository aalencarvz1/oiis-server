'use strict';

import { QueryInterface } from 'sequelize';
import  Logistic_Orders_Dest_Values  from '../models/Logistic_Orders_Dest_Values.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Logistic_Orders_Dest_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logistic_Orders_Dest_Values.tableName);    
  }
};