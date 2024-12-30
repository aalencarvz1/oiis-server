'use strict';

import { QueryInterface } from "sequelize";
import Schemas from "../models/Schemas.js";
import Connections from "../models/Connections.js";
import config from "../config/config.js";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";
import Tables from "../models/Tables.js";



/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Schemas.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});           
    await Schemas.migrateForeignKeyContraint(queryInterface,Connections);
    await queryInterface.bulkInsert(Schemas.tableName,[{      
      id:(config as any)[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : (config as any)[`${process.env.NODE_ENV||'development'}`].dialectOptions?.schema || (config as any)[`${process.env.NODE_ENV||'development'}`].database,
      default_connection_id: (config as any)[`${process.env.NODE_ENV||'development'}`].id,
      is_default : 1
    },{      
      id:(config as any)[`${process.env.NODE_ENV||'development'}_winthor`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : (config as any)[`${process.env.NODE_ENV||'development'}_winthor`].dialectOptions?.schema || (config as any)[`${process.env.NODE_ENV||'development'}_winthor`].database,
      default_connection_id: (config as any)[`${process.env.NODE_ENV||'development'}_winthor`].id,
      is_default : 0
    },{      
      id:(config as any)[`${process.env.NODE_ENV||'development'}_consult`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : (config as any)[`${process.env.NODE_ENV||'development'}_consult`].dialectOptions?.schema || (config as any)[`${process.env.NODE_ENV||'development'}_consult`].database,
      default_connection_id: (config as any)[`${process.env.NODE_ENV||'development'}_consult`].id,
      is_default : 0
    },{      
      id:(config as any)[`${process.env.NODE_ENV||'development'}_ep`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : (config as any)[`${process.env.NODE_ENV||'development'}_ep`].dialectOptions?.schema || (config as any)[`${process.env.NODE_ENV||'development'}_ep`].database,
      default_connection_id: (config as any)[`${process.env.NODE_ENV||'development'}_ep`].id,
      is_default : 0
    }]);  
    await Schemas.migrateForeignKeyContraint(queryInterface,Schemas);  
    await Tables.migrateForeignKeyContraint(queryInterface,Schemas);    
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Schemas.tableName);
  }
};