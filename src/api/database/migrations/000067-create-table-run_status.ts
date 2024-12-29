'use strict';

import { QueryInterface } from "sequelize";
import Record_Status from "../models/Record_Status.js";
import Data_Origins from "../models/Data_Origins.js";
import Run_Status from "../models/Run_Status.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Run_Status.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                
    await Run_Status.migrateForeignKeyContraint(queryInterface, Run_Status);  
    await Run_Status.migrateForeignKeyContraint(queryInterface, Record_Status);  
    await Run_Status.migrateForeignKeyContraint(queryInterface, Data_Origins);      
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Run_Status.tableName);
  }
};