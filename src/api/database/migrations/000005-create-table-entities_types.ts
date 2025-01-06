'use strict';

import { QueryInterface } from "sequelize";
import Tables from "../models/Tables.js";
import Entities_Types from "../models/Entities_Types.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Entities_Types.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});   
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Entities_Types);  
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Tables);                    
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Entities_Types.tableName);
  }
};