'use strict';

import { QueryInterface } from "sequelize";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";
import Identifier_Types from "../models/Identifier_Types.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Identifier_Types.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                 
    
    await queryInterface.bulkInsert(Identifier_Types.tableName,[{      
      id:Identifier_Types.CODE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CODE'
    }]);
    await Identifier_Types.migrateForeignKeyContraint(queryInterface,Identifier_Types);  
    await Identifier_Types.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Identifier_Types.migrateForeignKeyContraint(queryInterface,Data_Origins);  
        
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Identifier_Types.tableName);
  }
};