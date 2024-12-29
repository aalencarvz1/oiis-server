'use strict';

import { QueryInterface } from "sequelize";
import Data_Types from "../models/Data_Types.js";
import Tables from "../models/Tables.js";
import Parameters from "../models/Parameters.js";

/*imports*/
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Parameters.runUpMigration(queryInterface,{migrateForeignKeyContraint:false}); 
    await Parameters.migrateForeignKeyContraint(queryInterface,Parameters);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Data_Types);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Tables);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Parameters.tableName);
  }
};