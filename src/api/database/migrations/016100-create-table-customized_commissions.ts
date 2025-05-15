'use strict';

import { QueryInterface } from 'sequelize';
import Customized_Commissions from '../models/Customized_Commissions.js';

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Customized_Commissions.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Customized_Commissions.tableName);
  }
};