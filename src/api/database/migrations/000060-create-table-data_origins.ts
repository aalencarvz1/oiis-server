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
    await Data_Origins.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});       

    await queryInterface.bulkInsert(Data_Origins.tableName,[{
      id: Data_Origins.DEFAULT_ORIGINDATA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DEFAULT_ORIGINDATA'      
    },{
      id: Data_Origins.WINTHOR,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.WINTHOR,
      is_sys_rec : 1,
      name : 'WINTHOR'      
    },{
      id: Data_Origins.AURORA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.AURORA,
      is_sys_rec : 1,
      name : 'AURORA'      
    },{
      id: Data_Origins.CONSULTA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.CONSULTA,
      is_sys_rec : 1,
      name : 'CONSULTA'      
    },{
      id: Data_Origins.EP,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.EP,
      is_sys_rec : 1,
      name : 'EP'      
    }]);    

    await Data_Origins.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Tables.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Connections.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Schemas.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Contexts.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Data_Origins); 
    await Data_Types.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Action_Status.migrateForeignKeyContraint(queryInterface,Data_Origins); 
    await Parameters.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Data_Origins.tableName);
  }
};