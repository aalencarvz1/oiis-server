'use strict';

/*imports*/
const { StatusRegs } = require('../models/StatusRegs');
const { Tables } = require('../models/Tables');
const { Data_Types } = require('../models/Data_Types');
const { Parameters } = require('../models/Parameters');
const { Connections } = require('../models/Connections');
const { Schemas } = require('../models/Schemas');
const { Contexts } = require('../models/Contexts');
const { Entities_Types } = require('../models/Entities_Types');
const { Parameter_Values } = require('../models/Parameter_Values');
const { Data_Origins } = require('../models/Data_Origins');
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
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ACTIVE',
      ISACTIVE:1      
    },{
      id: StatusRegs.INACTIVE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'INACTIVE',
      ISACTIVE:1     
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });    

    
    await Tables.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Connections.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Schemas.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Contexts.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Entities_Types.migrateForeignKeyContraint(queryInterface,StatusRegs);      
    await Data_Types.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Parameters.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Data_Origins.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await StatusRegs.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await StatusRegs.migrateForeignKeyContraint(queryInterface,Data_Origins);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StatusRegs.tableName);
  }
};