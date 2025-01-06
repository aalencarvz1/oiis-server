'use strict';

import { QueryInterface } from 'sequelize';
import  Campaign_Kpi_Value_Detail_Entities  from '../models/Campaign_Kpi_Value_Detail_Entities.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Campaign_Kpi_Value_Detail_Entities.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Campaign_Kpi_Value_Detail_Entities.tableName);
  }
};