'use strict';

import { QueryInterface } from 'sequelize';
import  Sql_Objects  from '../models/Sql_Objects.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Sql_Objects.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Sql_Objects.tableName);
  }
};