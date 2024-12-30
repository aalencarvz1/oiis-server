'use strict';

import { QueryInterface } from 'sequelize';
import  Stock_Entity_Relationship_Types  from '../models/Stock_Entity_Relationship_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Stock_Entity_Relationship_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Stock_Entity_Relationship_Types.tableName);
  }
};