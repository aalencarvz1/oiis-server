'use strict';

import { QueryInterface } from "sequelize";
import Action_Status from "../models/Action_Status.js";

/*imports*/

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Action_Status.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                       
    await Action_Status.migrateForeignKeyContraint(queryInterface,Action_Status);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Action_Status.tableName);
  }
};