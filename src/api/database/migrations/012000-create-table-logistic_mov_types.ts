'use strict';

import { QueryInterface } from 'sequelize';
import  Logistic_Mov_Types  from '../models/Logistic_Mov_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Logistic_Mov_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logistic_Mov_Types.tableName);    
  }
};