'use strict';

import { QueryInterface } from 'sequelize';
import Project_Item_Origin_Types from '../models/Project_Item_Origin_Types.js';

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Project_Item_Origin_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Project_Item_Origin_Types.tableName);
  }
};