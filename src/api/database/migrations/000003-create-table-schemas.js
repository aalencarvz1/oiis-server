'use strict';

/*imports*/
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { Schemas } = require('../models/Schemas.js');
const { Tables } = require('../models/Tables.js');
const configDB  = require("../config/config.js");
const { Data_Origins } = require('../models/Data_Origins.js');
const { Record_Status } = require('../models/Record_Status.js');
const { Users } = require('../models/Users.js');
const { Connections } = require('../models/Connections.js');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Schemas.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});           
    await Schemas.migrateForeignKeyContraint(queryInterface,Connections);
    await queryInterface.bulkInsert(Schemas.tableName,[{      
      id:configDB[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : configDB[`${process.env.NODE_ENV||'development'}`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}`].database,
      default_connection_id: configDB[`${process.env.NODE_ENV||'development'}`].id,
      is_default : 1
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_winthor`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : configDB[`${process.env.NODE_ENV||'development'}_winthor`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_winthor`].database,
      default_connection_id: configDB[`${process.env.NODE_ENV||'development'}_winthor`].id,
      is_default : 0
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_consult`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : configDB[`${process.env.NODE_ENV||'development'}_consult`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_consult`].database,
      default_connection_id: configDB[`${process.env.NODE_ENV||'development'}_consult`].id,
      is_default : 0
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_ep`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : configDB[`${process.env.NODE_ENV||'development'}_ep`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_ep`].database,
      default_connection_id: configDB[`${process.env.NODE_ENV||'development'}_ep`].id,
      is_default : 0
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
    await Tables.migrateForeignKeyContraint(queryInterface,Schemas);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Schemas.tableName);
  }
};