'use strict';

import { QueryInterface } from 'sequelize';
import  Contacts  from '../models/Contacts.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Contacts.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Contacts.tableName);
  }
};