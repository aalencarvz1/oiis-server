'use strict';

import { QueryInterface } from 'sequelize';
import  Warehouse_Address_Types  from '../models/Warehouse_Address_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Warehouse_Address_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Warehouse_Address_Types.tableName);
  }
};