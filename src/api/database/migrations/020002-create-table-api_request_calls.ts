'use strict';

import { QueryInterface } from 'sequelize';
import  Api_Request_Calls  from '../models/Api_Request_Calls.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Api_Request_Calls.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Api_Request_Calls.tableName);
  }
};