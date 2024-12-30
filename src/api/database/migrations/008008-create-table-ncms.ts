'use strict';

import { QueryInterface } from 'sequelize';
import  Ncms  from '../models/Ncms.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Ncms.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Ncms.tableName);
  }
};