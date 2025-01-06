'use strict';

import { QueryInterface } from 'sequelize';
import  Item_Meas_Pack_Identif  from '../models/Item_Meas_Pack_Identif.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Item_Meas_Pack_Identif.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Item_Meas_Pack_Identif.tableName);
  }
};