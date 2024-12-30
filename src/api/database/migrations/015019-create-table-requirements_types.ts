'use strict';

import { QueryInterface } from 'sequelize';
import  Requirements_Types  from '../models/Requirements_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Requirements_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Requirements_Types.tableName);
  }
};