'use strict';

import { QueryInterface } from 'sequelize';
import  Tasks_Status_Users  from '../models/Tasks_Status_Users.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Tasks_Status_Users.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Tasks_Status_Users.tableName);
  }
};