'use strict';

import { QueryInterface } from 'sequelize';
import  Business_Units  from '../models/Business_Units.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Business_Units.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Business_Units.tableName);
  }
};