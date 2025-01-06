'use strict';

import { QueryInterface } from 'sequelize';
import  Groups  from '../models/Groups.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Groups.runUpMigration(queryInterface);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Groups.tableName);
  }
};