'use strict';


import { QueryInterface } from 'sequelize';
import  Meas_X_Meas_Origins  from '../models/Meas_X_Meas_Origins.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Meas_X_Meas_Origins.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Meas_X_Meas_Origins.tableName);
  }
};