'use strict';


import { QueryInterface } from 'sequelize';
import  Campaign_Kpis  from '../models/Campaign_Kpis.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Campaign_Kpis.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Campaign_Kpis.tableName);
  }
};