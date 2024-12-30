'use strict';

import { QueryInterface } from 'sequelize';
import  Api_Requests  from '../models/Api_Requests.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Api_Requests.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Api_Requests.tableName);
  }
};