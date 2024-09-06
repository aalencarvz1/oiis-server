'use strict';

/*imports*/
const { OriginsDatas } = require('../models/OriginsDatas');
const { DataTables } = require('../models/DataTables');
const { DataTypes } = require('../models/DataTypes');
const { Parameters } = require('../models/Parameters');
const { DataConnections } = require('../models/DataConnections');
const { DataSchemas } = require('../models/DataSchemas');
const { Contexts } = require('../models/Contexts');
const { EntitiesTypes } = require('../models/EntitiesTypes');
const { ParametersValues } = require('../models/ParametersValues');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await OriginsDatas.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});       

    await queryInterface.bulkInsert(OriginsDatas.name.toLowerCase(),[{
      id: OriginsDatas.DEFAULT_ORIGINDATA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DEFAULT_ORIGINDATA'      
    },{
      id: OriginsDatas.WINTHOR,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.WINTHOR,
      is_sys_rec : 1,
      name : 'WINTHOR'      
    },{
      id: OriginsDatas.AURORA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.AURORA,
      is_sys_rec : 1,
      name : 'AURORA'      
    },{
      id: OriginsDatas.CONSULTA,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.CONSULTA,
      is_sys_rec : 1,
      name : 'CONSULTA'      
    },{
      id: OriginsDatas.EP,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.EP,
      is_sys_rec : 1,
      name : 'EP'      
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });    

    
    await DataTables.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await DataConnections.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await DataSchemas.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await Contexts.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await EntitiesTypes.migrateForeignKeyContraint(queryInterface,OriginsDatas); 
    await DataTypes.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await Parameters.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await ParametersValues.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await OriginsDatas.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(OriginsDatas.name.toLowerCase());
  }
};