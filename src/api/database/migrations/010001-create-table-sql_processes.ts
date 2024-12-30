'use strict';

import { QueryInterface } from 'sequelize';
import  Sql_Processes  from '../models/Sql_Processes.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Sql_Processes.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Sql_Processes.tableName);
  }
};