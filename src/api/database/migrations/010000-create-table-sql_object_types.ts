'use strict';

import { QueryInterface } from 'sequelize';
import  Sql_Object_Types  from '../models/Sql_Object_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Sql_Object_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Sql_Object_Types.tableName);
  }
};