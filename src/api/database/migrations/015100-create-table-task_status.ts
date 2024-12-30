'use strict';

import { QueryInterface } from 'sequelize';
import  Task_Status  from '../models/Task_Status.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Task_Status.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Task_Status.tableName);
  }
};