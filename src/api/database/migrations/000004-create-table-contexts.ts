'use strict';

import { QueryInterface } from "sequelize";
import Contexts from "../models/Contexts.js";

/*imports*/

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Contexts.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                 
    await Contexts.migrateForeignKeyContraint(queryInterface,Contexts);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Contexts.tableName);
  }
};