'use strict';

import { QueryInterface } from 'sequelize';
import  Currencies  from '../models/Currencies.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Currencies.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Currencies.tableName);
  }
};