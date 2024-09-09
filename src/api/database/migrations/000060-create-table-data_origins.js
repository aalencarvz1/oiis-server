'use strict';

/*imports*/
const { Data_Origins } = require('../models/Data_Origins');
const { Tables } = require('../models/Tables');
const { Data_Types } = require('../models/Data_Types');
const { Parameters } = require('../models/Parameters');
const { Connections } = require('../models/Connections');
const { Schemas } = require('../models/Schemas');
const { Contexts } = require('../models/Contexts');
const { Entities_Types } = require('../models/Entities_Types');
const { Parameter_Values } = require('../models/Parameter_Values');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Data_Origins.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});       

    await queryInterface.bulkInsert(Data_Origins.tableName,[{
      id: Data_Origins.DEFAULT_ORIGINDATA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DEFAULT_ORIGINDATA'      
    },{
      id: Data_Origins.WINTHOR,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.WINTHOR,
      is_sys_rec : 1,
      name : 'WINTHOR'      
    },{
      id: Data_Origins.AURORA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.AURORA,
      is_sys_rec : 1,
      name : 'AURORA'      
    },{
      id: Data_Origins.CONSULTA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.CONSULTA,
      is_sys_rec : 1,
      name : 'CONSULTA'      
    },{
      id: Data_Origins.EP,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.EP,
      is_sys_rec : 1,
      name : 'EP'      
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });    

    
    await Tables.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Connections.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Schemas.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Contexts.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Data_Origins); 
    await Data_Types.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Data_Origins.migrateForeignKeyContraint(queryInterface,Data_Origins);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Data_Origins.tableName);
  }
};