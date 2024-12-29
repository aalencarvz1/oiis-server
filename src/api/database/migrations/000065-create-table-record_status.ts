'use strict';

import { QueryInterface } from "sequelize";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";
import Tables from "../models/Tables.js";
import Connections from "../models/Connections.js";
import Schemas from "../models/Schemas.js";
import Contexts from "../models/Contexts.js";
import Entities_Types from "../models/Entities_Types.js";
import Data_Types from "../models/Data_Types.js";
import Action_Status from "../models/Action_Status.js";
import Parameters from "../models/Parameters.js";
import Parameter_Values from "../models/Parameter_Values.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Record_Status.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         

    await queryInterface.bulkInsert(Record_Status.tableName,[{
      id: Record_Status.ACTIVE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ACTIVE',
      is_active:1      
    },{
      id: Record_Status.INACTIVE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'INACTIVE',
      is_active:1     
    }]);    

    await Record_Status.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Tables.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Connections.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Schemas.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Contexts.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Record_Status);      
    await Data_Types.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Action_Status.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Data_Origins.migrateForeignKeyContraint(queryInterface,Record_Status);      
    await Record_Status.migrateForeignKeyContraint(queryInterface,Data_Origins);  
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Record_Status.tableName);
  }
};