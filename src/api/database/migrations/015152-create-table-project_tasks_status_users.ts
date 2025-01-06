'use strict';

import { QueryInterface } from 'sequelize';
import  Project_Tasks_Status_Users  from '../models/Project_Tasks_Status_Users.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Project_Tasks_Status_Users.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Project_Tasks_Status_Users.tableName);
  }
};