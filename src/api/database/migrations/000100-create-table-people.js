'use strict';

/*imports*/
const { People } = require('../models/People');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Identifier_Types } = require('../models/Identifier_Types');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await People.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         
    
    await queryInterface.bulkInsert(People.tableName,[{      
      id:People.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      identifier_doc_type_id : Identifier_Types.CODE,
      identifier_doc: People.SYSTEM,
      name : 'SYSTEM'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
    
    await People.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await People.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await People.migrateForeignKeyContraint(queryInterface,Identifier_Types);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(People.tableName);
  }
};