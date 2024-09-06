'use strict';

/*imports*/

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { DataConnections } = require('../models/DataConnections');
const { DataTables } = require('../models/DataTables');
const configDB  = require("../config/config");
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  
  async up(queryInterface, Sequelize) {
    await DataConnections.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
    await queryInterface.bulkInsert(DataConnections.name.toLowerCase(),[{      
      id:configDB[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : process.env.NODE_ENV,
      ISDEFAULT : 1
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_winthor`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.WINTHOR,
      is_sys_rec : 1,
      NAME : `WINTHOR`,
      ISDEFAULT : 0
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_consult`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.CONSULTA,
      is_sys_rec : 1,
      NAME : `CONSULTA`,
      ISDEFAULT : 0
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_ep`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.EP,
      is_sys_rec : 1,
      NAME : `EP`,
      ISDEFAULT : 0
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
    await DataTables.migrateForeignKeyContraint(queryInterface,DataConnections);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataConnections.name.toLowerCase());
  }
};