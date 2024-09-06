'use strict';

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
const { DataSchemas } = require('../models/DataSchemas');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(DataSchemas.name.toLowerCase(),[{      
      id:configDB[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}`].database,
      ISDEFAULT : 1
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_winthor`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}_winthor`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_winthor`].database,
      ISDEFAULT : 0
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_consult`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}_consult`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_consult`].database,
      ISDEFAULT : 0
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_ep`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}_ep`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_ep`].database,
      ISDEFAULT : 0
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(DataTypes.name.toLowerCase(), null, {});
  }
};
