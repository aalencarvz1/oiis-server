'use strict';

import { QueryInterface } from 'sequelize';
import  Warehouses  from '../models/Warehouses.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Warehouses.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Warehouses.tableName);
  }
};