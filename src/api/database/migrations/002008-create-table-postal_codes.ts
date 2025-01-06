'use strict';

import { QueryInterface } from 'sequelize';
import  Postal_Codes  from '../models/Postal_Codes.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Postal_Codes.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Postal_Codes.tableName);
  }
};