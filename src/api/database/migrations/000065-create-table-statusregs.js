'use strict';

/*imports*/
const { StatusRegs } = require('../models/StatusRegs');
const { DataTables } = require('../models/DataTables');
const { DataTypes } = require('../models/DataTypes');
const { Parameters } = require('../models/Parameters');
const { DataConnections } = require('../models/DataConnections');
const { DataSchemas } = require('../models/DataSchemas');
const { Contexts } = require('../models/Contexts');
const { EntitiesTypes } = require('../models/EntitiesTypes');
const { ParametersValues } = require('../models/ParametersValues');
const { OriginsDatas } = require('../models/OriginsDatas');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await StatusRegs.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         

    await queryInterface.bulkInsert(StatusRegs.tableName,[{
      id: StatusRegs.ACTIVE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ACTIVE',
      ISACTIVE:1      
    },{
      id: StatusRegs.INACTIVE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'INACTIVE',
      ISACTIVE:1     
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });    

    
    await DataTables.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await DataConnections.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await DataSchemas.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Contexts.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await EntitiesTypes.migrateForeignKeyContraint(queryInterface,StatusRegs);      
    await DataTypes.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Parameters.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await ParametersValues.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await OriginsDatas.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await StatusRegs.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await StatusRegs.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StatusRegs.tableName);
  }
};