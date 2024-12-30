'use strict';

import { QueryInterface } from 'sequelize';
import  NeighborHoods  from '../models/NeighborHoods.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await NeighborHoods.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(NeighborHoods.tableName);
  }
};