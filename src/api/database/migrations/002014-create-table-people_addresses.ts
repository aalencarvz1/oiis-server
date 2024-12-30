'use strict';

import { QueryInterface } from 'sequelize';
import  People_Addresses  from '../models/People_Addresses.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await People_Addresses.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(People_Addresses.tableName);
  }
};