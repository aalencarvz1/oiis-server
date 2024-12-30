'use strict';

import { QueryInterface } from 'sequelize';
import  Tasks  from '../models/Tasks.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Tasks.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Tasks.tableName);
  }
};