'use strict';

/*imports*/
import { QueryInterface } from "sequelize";
import Connections from "../models/Connections.js";
import Users from "../models/Users.js";
import Tables from "../models/Tables.js";
import config from "../config/config.js";
import Record_Status from "../models/Record_Status.js";
import Data_Origins from "../models/Data_Origins.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  
  async up(queryInterface:QueryInterface, Sequelize: any) {
    await Connections.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
    await queryInterface.bulkInsert(Connections.tableName,[{      
      id: (config as any)[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : process.env.NODE_ENV,
      default_env_identifier: `${process.env.NODE_ENV||'development'}`,
      is_default : 1
    },{      
      id:(config as any)[`${process.env.NODE_ENV||'development'}_winthor`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.WINTHOR,
      is_sys_rec : 1,
      name : `WINTHOR`,
      default_env_identifier: `${process.env.NODE_ENV||'development'}_winthor`,
      is_default : 0
    },{      
      id:(config as any)[`${process.env.NODE_ENV||'development'}_consult`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.CONSULTA,
      is_sys_rec : 1,
      name : `CONSULTA`,
      default_env_identifier: `${process.env.NODE_ENV||'development'}_consult`,
      is_default : 0
    },{      
      id:(config as any)[`${process.env.NODE_ENV||'development'}_ep`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.EP,
      is_sys_rec : 1,
      name : `EP`,
      default_env_identifier: `${process.env.NODE_ENV||'development'}_ep`,
      is_default : 0
    }]);  
    await Connections.migrateForeignKeyContraint(queryInterface,Connections);  
    await Tables.migrateForeignKeyContraint(queryInterface,Connections);    
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Connections.tableName);
  }
};