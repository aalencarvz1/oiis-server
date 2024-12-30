'use strict';

import { QueryInterface } from 'sequelize';
import  Campaign_Kpi_Value_Periods  from '../models/Campaign_Kpi_Value_Periods.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Campaign_Kpi_Value_Periods.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Campaign_Kpi_Value_Periods.tableName);
  }
};