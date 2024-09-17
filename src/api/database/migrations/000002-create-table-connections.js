'use strict';

/*imports*/

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { Connections } = require('../models/Connections');
const { Tables } = require('../models/Tables');
const configDB  = require("../config/config");
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  
  async up(queryInterface, Sequelize) {
    await Connections.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
    await queryInterface.bulkInsert(Connections.tableName,[{      
      id:configDB[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : process.env.NODE_ENV,
      is_default : 1
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_winthor`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.WINTHOR,
      is_sys_rec : 1,
      name : `WINTHOR`,
      is_default : 0
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_consult`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.CONSULTA,
      is_sys_rec : 1,
      name : `CONSULTA`,
      is_default : 0
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_ep`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.EP,
      is_sys_rec : 1,
      name : `EP`,
      is_default : 0
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
    await Tables.migrateForeignKeyContraint(queryInterface,Connections);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Connections.tableName);
  }
};