'use strict';

import { QueryInterface } from 'sequelize';
import  Financial_Value_Localization_Types  from '../models/Financial_Value_Localization_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Financial_Value_Localization_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Financial_Value_Localization_Types.tableName);
  }
};