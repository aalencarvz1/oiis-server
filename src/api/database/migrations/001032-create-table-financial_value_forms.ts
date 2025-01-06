'use strict';

import { QueryInterface } from 'sequelize';
import  Financial_Value_Forms  from '../models/Financial_Value_Forms.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Financial_Value_Forms.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Financial_Value_Forms.tableName);
  }
};