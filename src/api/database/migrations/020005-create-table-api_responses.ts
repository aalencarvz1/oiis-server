'use strict';

import { QueryInterface } from 'sequelize';
import  Api_Responses  from '../models/Api_Responses.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Api_Responses.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Api_Responses.tableName);
  }
};