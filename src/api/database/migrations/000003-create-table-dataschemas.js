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
    await queryInterface.bulkInsert(DataSchemas.name.toUpperCase(),[{      
      ID:configDB[`${process.env.NODE_ENV||'development'}`].ID,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}`].database,
      ISDEFAULT : 1
    },{      
      ID:configDB[`${process.env.NODE_ENV||'development'}_winthor`].ID,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}_winthor`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_winthor`].database,
      ISDEFAULT : 0
    },{      
      ID:configDB[`${process.env.NODE_ENV||'development'}_consult`].ID,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}_consult`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_consult`].database,
      ISDEFAULT : 0
    },{      
      ID:configDB[`${process.env.NODE_ENV||'development'}_ep`].ID,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}_ep`].dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}_ep`].database,
      ISDEFAULT : 0
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
    await DataTables.migrateForeignKeyContraint(queryInterface,DataSchemas);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataSchemas.name.toUpperCase());
  }
};