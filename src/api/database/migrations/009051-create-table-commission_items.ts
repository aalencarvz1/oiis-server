'use strict';

import { QueryInterface } from 'sequelize';
import  Commission_Items  from '../models/Commission_Items.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Commission_Items.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Commission_Items.tableName);
  }
};