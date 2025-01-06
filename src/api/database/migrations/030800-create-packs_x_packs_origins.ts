'use strict';


import { QueryInterface } from 'sequelize';
import  Packs_X_Packs_Origins  from '../models/Packs_X_Packs_Origins.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Packs_X_Packs_Origins.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Packs_X_Packs_Origins.tableName);
  }
};