'use strict';

import { QueryInterface } from 'sequelize';
import  Postal_Codes_Paths  from '../models/Postal_Codes_Paths.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Postal_Codes_Paths.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Postal_Codes_Paths.tableName);
  }
};