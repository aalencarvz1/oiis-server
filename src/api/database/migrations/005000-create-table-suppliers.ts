'use strict';

import { QueryInterface } from 'sequelize';
import  Suppliers  from '../models/Suppliers.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Suppliers.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Suppliers.tableName);
  }
};