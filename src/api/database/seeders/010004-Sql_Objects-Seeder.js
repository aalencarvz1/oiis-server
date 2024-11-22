'use strict';
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
const { Sql_Object_Types } = require('../models/Sql_Object_Types');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const { Sql_Objects } = require('../models/Sql_Objects');
const { PcFilial } = require('../models/winthor/PcFilial');
const { Utils } = require('../../controllers/utils/Utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    

    let registers = [];

    await queryInterface.bulkInsert(Sql_Objects.tableName,[{      
      id: configDB[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id : Sql_Object_Types.DATABASE,
      name : configDB[`${process.env.NODE_ENV||'development'}`].database,
    },{            
      id: configDB[`${process.env.NODE_ENV||'development'}`].id + 1,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id : Sql_Object_Types.USER,
      parent_id : configDB[`${process.env.NODE_ENV||'development'}`].id,
      name : configDB[`${process.env.NODE_ENV||'development'}`].user || configDB[`${process.env.NODE_ENV||'development'}`].database,
    },{      
      id: configDB[`${process.env.NODE_ENV||'development'}`].id + 2,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id : Sql_Object_Types.SCHEMA,
      parent_id : configDB[`${process.env.NODE_ENV||'development'}`].id + 1,
      name : configDB[`${process.env.NODE_ENV||'development'}`].schema || configDB[`${process.env.NODE_ENV||'development'}`]?.dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}`].database
    },{
      id: configDB["development_winthor"]?.id,      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      sql_object_type_id : Sql_Object_Types.DATABASE,
      name : 'WINT',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
    

    //JUMBO USER/SCHEMA
    let wintObject = await Sql_Objects.getModel().findOne({
      raw:true,
      where: {
        sql_object_type_id : Sql_Object_Types.DATABASE, 
        name: 'WINT',      
      }
    });
    if (Object.keys(wintObject||{}).length == 0) {
      await queryInterface.bulkInsert(Sql_Objects.tableName,[{
        status_reg_id: Record_Status.ACTIVE,
        creator_user_id : Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
        is_sys_rec : 1,
        sql_object_type_id : Sql_Object_Types.DATABASE,
        name : 'WINT',
      }],{
        ignoreDuplicates:true,
        updateOnDuplicate:null
      });

      wintObject = await Sql_Objects.getModel().findOne({
        raw:true,
        where: {
          sql_object_type_id : Sql_Object_Types.DATABASE, 
          name: 'WINT',      
        }
      });
    }
    
    let wintUserObject = await Sql_Objects.getModel().findOne({raw:true,where: {
      sql_object_type_id : Sql_Object_Types.USER, 
      parent_id:wintObject.id, 
      name: 'JUMBO'
    }});

    if (Object.keys(wintUserObject||{}).length == 0) {
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
        ignoreDuplicates:true,
        updateOnDuplicate:null
      });

      wintUserObject = await Sql_Objects.getModel().findOne({raw:true,where: {
        sql_object_type_id : Sql_Object_Types.USER, 
        parent_id:wintObject.id, 
        name: 'JUMBO'
      }});
    }

    let wintSchemaObject = await Sql_Objects.getModel().findOne({raw:true,where: {
      sql_object_type_id : Sql_Object_Types.SCHEMA, 
      parent_id:wintUserObject.id, 
      name: 'JUMBO'
    }});
    if (Object.keys(wintSchemaObject||{}).length == 0) {
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
        ignoreDuplicates:true,
        updateOnDuplicate:null
      });

      wintSchemaObject = await Sql_Objects.getModel().findOne({raw:true,where: {
        sql_object_type_id : Sql_Object_Types.SCHEMA, 
        parent_id:wintUserObject.id, 
        name: 'JUMBO'
      }});
    }

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
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });

    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Sql_Objects.tableName, null, {});
  }
};
