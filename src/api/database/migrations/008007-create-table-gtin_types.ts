'use strict';

import { QueryInterface } from 'sequelize';
import  Gtin_Types  from '../models/Gtin_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Gtin_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Gtin_Types.tableName);
  }
};