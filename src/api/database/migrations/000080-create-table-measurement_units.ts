'use strict';

import { QueryInterface } from "sequelize";
import Record_Status from "../models/Record_Status.js";
import Data_Origins from "../models/Data_Origins.js";
import Greatnesses from "../models/Greatnesses.js";
import Measurement_Units from "../models/Measurement_Units.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Measurement_Units.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Measurement_Units);  
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Greatnesses);  
        
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Measurement_Units.tableName);
  }
};