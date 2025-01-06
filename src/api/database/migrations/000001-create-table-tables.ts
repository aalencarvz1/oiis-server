'use strict';

import { QueryInterface } from "sequelize";
import Tables from "../models/Tables.js";



/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Tables.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
    await Tables.migrateForeignKeyContraint(queryInterface,Tables);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Tables.tableName);
  }
};