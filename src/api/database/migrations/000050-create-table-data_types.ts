'use strict';

import { QueryInterface } from "sequelize";
import Data_Types from "../models/Data_Types.js";



/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Data_Types.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                       
    await Data_Types.migrateForeignKeyContraint(queryInterface,Data_Types);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Data_Types.tableName);
  }
};