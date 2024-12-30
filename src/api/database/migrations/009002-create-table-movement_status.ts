'use strict';

import { QueryInterface } from 'sequelize';
import  Movement_Status  from '../models/Movement_Status.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Movement_Status.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Movement_Status.tableName);
  }
};