'use strict';

import { QueryInterface } from 'sequelize';
import  Item_Stock_Units  from '../models/Item_Stock_Units.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Item_Stock_Units.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Item_Stock_Units.tableName);
  }
};