'use strict';

import { QueryInterface } from 'sequelize';
import  Container_Type_Dimensions  from '../models/Container_Type_Dimensions.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Container_Type_Dimensions.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Container_Type_Dimensions.tableName);
  }
};