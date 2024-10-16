'use strict';

/*imports*/
const { Record_Status } = require('../models/Record_Status');
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
    await Record_Status.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         

    await queryInterface.bulkInsert(Record_Status.tableName,[{
      id: Record_Status.ACTIVE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ACTIVE',
      is_active:1      
    },{
      id: Record_Status.INACTIVE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'INACTIVE',
      is_active:1     
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });    

    
    await Tables.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Connections.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Schemas.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Contexts.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Record_Status);      
    await Data_Types.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Data_Origins.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Record_Status.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Record_Status.migrateForeignKeyContraint(queryInterface,Data_Origins);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Record_Status.tableName);
  }
};