'use strict';

import { QueryInterface } from 'sequelize';
import  Items_Lots_Containers  from '../models/Items_Lots_Containers.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Items_Lots_Containers.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Items_Lots_Containers.tableName);
  }
};