'use strict';

import { QueryInterface } from 'sequelize';
import  Item_Status  from '../models/Item_Status.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Item_Status.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Item_Status.tableName);
  }
};