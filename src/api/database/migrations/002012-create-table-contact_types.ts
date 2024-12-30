'use strict';

import { QueryInterface } from 'sequelize';
import  Contact_Types  from '../models/Contact_Types.js';
/** @type {import('sequelize-cli').Migration} */


/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Contact_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Contact_Types.tableName);
  }
};