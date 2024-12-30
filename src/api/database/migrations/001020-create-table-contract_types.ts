'use strict';

import { QueryInterface } from 'sequelize';
import  Contract_Types  from '../models/Contract_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Contract_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Contract_Types.tableName);
  }
};