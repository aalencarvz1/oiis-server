'use strict';

import { QueryInterface } from 'sequelize';
import Campaign_Entities_Kpi_Value_Getters_Values from '../models/Campaign_Entities_Kpi_Value_Getters_Values.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Campaign_Entities_Kpi_Value_Getters_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Campaign_Entities_Kpi_Value_Getters_Values.tableName);
  }
};