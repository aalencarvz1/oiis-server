'use strict';

import { QueryInterface } from 'sequelize';
import  Integration_Rules  from '../models/Integration_Rules.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Integration_Rules.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Integration_Rules.tableName);
  }
};