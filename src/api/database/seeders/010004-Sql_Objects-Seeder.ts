'use strict';
import  Sql_Object_Types  from '../models/Sql_Object_Types.js';
import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import  Sql_Objects  from '../models/Sql_Objects.js';
//import  PcFilial  from '../models/winthor/PcFilial.js';
import config from '../config/config.js';
import { QueryInterface, QueryTypes } from 'sequelize';
import Utils from '../../controllers/utils/Utils.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    

    let registers = [];

    await queryInterface.bulkInsert(Sql_Objects.tableName,[{      
      id: (config as any)[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id : Sql_Object_Types.DATABASE,
      name : (config as any)[`${process.env.NODE_ENV||'development'}`].database,
    },{            
      id: (config as any)[`${process.env.NODE_ENV||'development'}`].id + 1,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id : Sql_Object_Types.USER,
      parent_id : (config as any)[`${process.env.NODE_ENV||'development'}`].id,
      name : (config as any)[`${process.env.NODE_ENV||'development'}`].user || (config as any)[`${process.env.NODE_ENV||'development'}`].database,
    },{      
      id: (config as any)[`${process.env.NODE_ENV||'development'}`].id + 2,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id : Sql_Object_Types.SCHEMA,
      parent_id : (config as any)[`${process.env.NODE_ENV||'development'}`].id + 1,
      name : (config as any)[`${process.env.NODE_ENV||'development'}`].schema || (config as any)[`${process.env.NODE_ENV||'development'}`]?.dialectOptions?.schema || (config as any)[`${process.env.NODE_ENV||'development'}`].database
    },{
      id: (config as any)["development_winthor"]?.id,      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id : Sql_Object_Types.DATABASE,
      name : 'WINT',
    }],{
      ignoreDuplicates:true
    });
    


  
    //JUMBO USER/SCHEMA
    let query = `
      select
        * 
      from
        ${Sql_Objects.tableName}
      where
        sql_object_type_id = ${Sql_Object_Types.DATABASE}
        and name = 'WINT'
    `
    let wintObject : any = await queryInterface.sequelize.query(
      query,
      {
        type: QueryTypes.SELECT,
      }
    );
    wintObject = wintObject[0] || null;

    if (!Utils.hasValue(wintObject)) {
      await queryInterface.bulkInsert(Sql_Objects.tableName,[{
        status_reg_id: Record_Status.ACTIVE,
        creator_user_id : Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
        is_sys_rec : 1,
        sql_object_type_id : Sql_Object_Types.DATABASE,
        name : 'WINT',
      }],{
        ignoreDuplicates:true
      });

      wintObject = await queryInterface.sequelize.query(
        query,
        {
          type: QueryTypes.SELECT,
        }
      );
      wintObject = wintObject[0] || null;
    }

  
    query = `
      select
        * 
      from
        ${Sql_Objects.tableName}
      where
        sql_object_type_id = ${Sql_Object_Types.USER}
        and parent_id = ${wintObject.id}
        and name = 'JUMBO'
    `
    let wintUserObject : any = await queryInterface.sequelize.query(
      query,
      {
        type: QueryTypes.SELECT,
      }
    );
    wintUserObject = wintUserObject[0] || null;

    if (!Utils.hasValue(wintUserObject)) {
      await queryInterface.bulkInsert(Sql_Objects.tableName,[{      
        status_reg_id: Record_Status.ACTIVE,
        creator_user_id : Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
        is_sys_rec : 1,
        sql_object_type_id : Sql_Object_Types.USER,
        parent_id : wintObject.id,
        name : 'JUMBO',
      }],{
        ignoreDuplicates:true
      });

      wintUserObject = await queryInterface.sequelize.query(
        query,
        {
          type: QueryTypes.SELECT,
        }
      );
      wintUserObject = wintUserObject[0] || null;
    }

    
    query = `
      select
        * 
      from
        ${Sql_Objects.tableName}
      where
        sql_object_type_id = ${Sql_Object_Types.SCHEMA}
        and parent_id = ${wintUserObject.id}
        and name = 'JUMBO'
    `
    let wintSchemaObject : any = await queryInterface.sequelize.query(
      query,
      {
        type: QueryTypes.SELECT,
      }
    );
    wintSchemaObject = wintSchemaObject[0] || null;


    if (!Utils.hasValue(wintSchemaObject)) {
      await queryInterface.bulkInsert(Sql_Objects.tableName,[{      
        status_reg_id: Record_Status.ACTIVE,
        creator_user_id : Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
        is_sys_rec : 1,
        sql_object_type_id : Sql_Object_Types.SCHEMA,
        parent_id : wintUserObject.id,
        name : 'JUMBO',
      }],{
        ignoreDuplicates:true
      });

      wintSchemaObject = await queryInterface.sequelize.query(
        query,
        {
          type: QueryTypes.SELECT,
        }
      );
      wintSchemaObject = wintSchemaObject[0] || null;
    }

    /*
    @todo re-implement on migration
    await queryInterface.bulkInsert(Sql_Objects.tableName,[{      
      id: PcFilial.id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,      
      sql_object_type_id : Sql_Object_Types.TABLE,
      parent_id: wintSchemaObject.id,
      name : PcFilial.tableName,
    }],{
      ignoreDuplicates:true
    });*/

    
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Sql_Objects.tableName, {});
  }
};
