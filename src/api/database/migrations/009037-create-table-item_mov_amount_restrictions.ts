'use strict';

import { QueryInterface } from 'sequelize';
import  Item_Mov_Amount_Restrictions  from '../models/Item_Mov_Amount_Restrictions.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Item_Mov_Amount_Restrictions.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Item_Mov_Amount_Restrictions.tableName);
  }
};