'use strict';

import { QueryInterface } from 'sequelize';
import  Report_Data_Founts  from '../models/Report_Data_Founts.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Report_Data_Founts.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Report_Data_Founts.tableName);
  }
};