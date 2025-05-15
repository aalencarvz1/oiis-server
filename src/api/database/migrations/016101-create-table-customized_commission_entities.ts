'use strict';

import { QueryInterface } from 'sequelize';
import  Customized_Commission_Entities  from '../models/Customized_Commission_Entities.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Customized_Commission_Entities.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Customized_Commission_Entities.tableName);
  }
};