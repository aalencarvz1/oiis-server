'use strict';

import { QueryInterface } from 'sequelize';
import  Postal_Codes_Streets  from '../models/Postal_Codes_Streets.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Postal_Codes_Streets.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Postal_Codes_Streets.tableName);
  }
};