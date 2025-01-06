'use strict';

import { QueryInterface } from "sequelize";
import Record_Status from "../models/Record_Status.js";
import Data_Origins from "../models/Data_Origins.js";
import Sync_Status from "../models/Sync_Status.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Sync_Status.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                  
    await Sync_Status.migrateForeignKeyContraint(queryInterface, Sync_Status);  
    await Sync_Status.migrateForeignKeyContraint(queryInterface, Record_Status);  
    await Sync_Status.migrateForeignKeyContraint(queryInterface, Data_Origins);      
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Sync_Status.tableName);
  }
};