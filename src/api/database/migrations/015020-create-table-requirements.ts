'use strict';

import { QueryInterface } from 'sequelize';
import  Requirements  from '../models/Requirements.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Requirements.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Requirements.tableName);
  }
};