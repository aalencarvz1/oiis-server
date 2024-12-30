'use strict';

import { QueryInterface } from 'sequelize';
import  Movement_Entity_Relationship_Types  from '../models/Movement_Entity_Relationship_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Movement_Entity_Relationship_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Movement_Entity_Relationship_Types.tableName);
  }
};