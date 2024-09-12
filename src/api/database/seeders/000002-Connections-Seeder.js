'use strict';

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
const { Connections } = require('../models/Connections');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Connections.tableName,[{      
      id:configDB[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : process.env.NODE_ENV,
      ISDEFAULT : 1
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_winthor`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.WINTHOR,
      is_sys_rec : 1,
      name : `WINTHOR`,
      ISDEFAULT : 1
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_consult`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.CONSULTA,
      is_sys_rec : 1,
      name : `CONSULTA`,
      ISDEFAULT : 1
    },{      
      id:configDB[`${process.env.NODE_ENV||'development'}_ep`].id,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.EP,
      is_sys_rec : 1,
      name : `EP`,
      ISDEFAULT : 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Connections.tableName, null, {});
  }
};
