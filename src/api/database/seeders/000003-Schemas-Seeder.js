'use strict';

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
const { Schemas } = require('../models/Schemas');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
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
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Schemas.tableName, null, {});
  }
};
