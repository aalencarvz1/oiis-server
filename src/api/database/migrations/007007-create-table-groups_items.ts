'use strict';

import { QueryInterface } from 'sequelize';
import  Groups_Items  from '../models/Groups_Items.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Groups_Items.runUpMigration(queryInterface);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Groups_Items.tableName);
  }
};