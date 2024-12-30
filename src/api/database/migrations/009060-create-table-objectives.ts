'use strict';

import { QueryInterface } from 'sequelize';
import  Objectives  from '../models/Objectives.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Objectives.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Objectives.tableName);
  }
};