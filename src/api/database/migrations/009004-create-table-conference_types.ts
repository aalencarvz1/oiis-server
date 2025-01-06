'use strict';

import { QueryInterface } from 'sequelize';
import  Conference_Types  from '../models/Conference_Types.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Conference_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Conference_Types.tableName);
  }
};