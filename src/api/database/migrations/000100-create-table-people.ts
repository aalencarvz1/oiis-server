'use strict';

import { QueryInterface } from "sequelize";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";
import Identifier_Types from "../models/Identifier_Types.js";
import People from "../models/People.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await People.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         
    
    await queryInterface.bulkInsert(People.tableName,[{      
      id:People.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      identifier_doc_type_id : Identifier_Types.CODE,
      identifier_doc: People.SYSTEM,
      name : 'SYSTEM'
    }]); 
    await People.migrateForeignKeyContraint(queryInterface,People);  
    await People.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await People.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await People.migrateForeignKeyContraint(queryInterface,Identifier_Types);  
        
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(People.tableName);
  }
};