'use strict';

import { QueryInterface } from 'sequelize';
import  Packagings  from '../models/Packagings.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Packagings.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Packagings.tableName);
  }
};