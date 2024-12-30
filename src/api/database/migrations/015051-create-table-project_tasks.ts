'use strict';

import { QueryInterface } from 'sequelize';
import  Project_Tasks  from '../models/Project_Tasks.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Project_Tasks.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Project_Tasks.tableName);
  }
};