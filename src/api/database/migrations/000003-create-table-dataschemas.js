'use strict';

/*imports*/
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { DataSchemas } = require('../models/DataSchemas.js');
const { DataTables } = require('../models/DataTables.js');
const configDB  = require("../config/config.js");
const { OriginsDatas } = require('../models/OriginsDatas.js');
const { StatusRegs } = require('../models/StatusRegs.js');
const { Users } = require('../models/Users.js');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DataSchemas.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});           
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
    await DataTables.migrateForeignKeyContraint(queryInterface,DataSchemas);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataSchemas.name.toLowerCase());
  }
};