'use strict';

import { QueryInterface } from 'sequelize';
import  Warehouse_Addresses  from '../models/Warehouse_Addresses.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Warehouse_Addresses.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Warehouse_Addresses.tableName);
  }
};