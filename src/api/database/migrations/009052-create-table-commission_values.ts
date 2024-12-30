'use strict';

import { QueryInterface } from 'sequelize';
import  Commission_Values  from '../models/Commission_Values.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Commission_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Commission_Values.tableName);
  }
};