'use strict';

/*imports*/
const { Identifier_Types } = require('../models/Identifier_Types');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Identifier_Types.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                 
    
    await queryInterface.bulkInsert(Identifier_Types.tableName,[{      
      id:Identifier_Types.CODE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CODE'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
    
    await Identifier_Types.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Identifier_Types.migrateForeignKeyContraint(queryInterface,Data_Origins);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Identifier_Types.tableName);
  }
};