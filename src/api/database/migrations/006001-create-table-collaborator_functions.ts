'use strict';

import { QueryInterface } from 'sequelize';
import  Collaborator_Functions  from '../models/Collaborator_Functions.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Collaborator_Functions.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Collaborator_Functions.tableName);
  }
};