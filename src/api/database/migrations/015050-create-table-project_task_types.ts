'use strict';

import { QueryInterface } from 'sequelize';
import  Project_Task_Types  from '../models/Project_Task_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Project_Task_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Project_Task_Types.tableName);
  }
};