'use strict';

import { QueryInterface } from 'sequelize';
import  Logistic_Status  from '../models/Logistic_Status.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Logistic_Status.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logistic_Status.tableName);    
  }
};