'use strict';

import { QueryInterface } from 'sequelize';
import  Movements_Groups  from '../models/Movements_Groups.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Movements_Groups.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Movements_Groups.tableName);
  }
};