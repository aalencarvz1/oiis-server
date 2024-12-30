'use strict';

import { QueryInterface } from 'sequelize';
import  Logistic_Reasons  from '../models/Logistic_Reasons.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Logistic_Reasons.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logistic_Reasons.tableName);    
  }
};