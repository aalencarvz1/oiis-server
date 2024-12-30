'use strict';

import { QueryInterface } from 'sequelize';
import  Campaign_Entities  from '../models/Campaign_Entities.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Campaign_Entities.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Campaign_Entities.tableName);
  }
};