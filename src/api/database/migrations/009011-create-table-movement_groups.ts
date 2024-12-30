'use strict';

import { QueryInterface } from 'sequelize';
import  Movement_Groups  from '../models/Movement_Groups.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Movement_Groups.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Movement_Groups.tableName);
  }
};