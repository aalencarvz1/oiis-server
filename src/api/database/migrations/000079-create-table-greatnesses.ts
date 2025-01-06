'use strict';

import { QueryInterface } from "sequelize";
import Record_Status from "../models/Record_Status.js";
import Data_Origins from "../models/Data_Origins.js";
import Greatnesses from "../models/Greatnesses.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Greatnesses.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});     
    await Greatnesses.migrateForeignKeyContraint(queryInterface,Greatnesses);  
    await Greatnesses.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Greatnesses.migrateForeignKeyContraint(queryInterface,Data_Origins);  
        
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Greatnesses.tableName);
  }
};