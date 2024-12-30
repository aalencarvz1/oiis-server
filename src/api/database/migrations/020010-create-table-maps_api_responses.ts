'use strict';

import { QueryInterface } from 'sequelize';
import  Maps_Api_Responses  from '../models/Maps_Api_Responses.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Maps_Api_Responses.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Maps_Api_Responses.tableName);
  }
};