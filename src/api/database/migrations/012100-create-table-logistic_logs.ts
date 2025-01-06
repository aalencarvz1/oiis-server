'use strict';

import { QueryInterface } from 'sequelize';
import  Logistic_Logs  from '../models/Logistic_Logs.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Logistic_Logs.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logistic_Logs.tableName);    
  }
};