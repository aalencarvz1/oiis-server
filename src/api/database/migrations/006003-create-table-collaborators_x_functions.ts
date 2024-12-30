'use strict';

import { QueryInterface } from 'sequelize';
import  Collaborators_X_Functions  from '../models/Collaborators_X_Functions.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Collaborators_X_Functions.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Collaborators_X_Functions.tableName);
  }
};