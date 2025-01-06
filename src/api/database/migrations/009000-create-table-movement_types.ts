'use strict';

import { QueryInterface } from 'sequelize';
import  Movement_Types  from '../models/Movement_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Movement_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Movement_Types.tableName);
  }
};