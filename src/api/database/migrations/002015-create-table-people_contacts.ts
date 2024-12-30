'use strict';

import { QueryInterface } from 'sequelize';
import  People_Contacts  from '../models/People_Contacts.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await People_Contacts.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(People_Contacts.tableName);
  }
};