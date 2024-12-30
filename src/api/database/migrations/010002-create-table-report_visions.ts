'use strict';

import { QueryInterface } from 'sequelize';
import  Report_Visions  from '../models/Report_Visions.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Report_Visions.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Report_Visions.tableName);
  }
};