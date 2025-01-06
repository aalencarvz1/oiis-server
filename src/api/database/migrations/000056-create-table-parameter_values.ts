'use strict';

import { QueryInterface } from "sequelize";
import Parameters from "../models/Parameters.js";
import Parameter_Values from "../models/Parameter_Values.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Parameter_Values.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});    
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Parameter_Values);  
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Parameters);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Parameter_Values.tableName);
  }
};