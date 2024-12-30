'use strict';

import { QueryInterface } from 'sequelize';
import  Addresses  from '../models/Addresses.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Addresses.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Addresses.tableName);
  }
};