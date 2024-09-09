'use strict';

/*imports*/
const { People } = require('../models/People');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
const { IdentifiersTypes } = require('../models/IdentifiersTypes');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await People.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         
    
    await queryInterface.bulkInsert(People.tableName,[{      
      id:People.SYSTEM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDIDENTIFIERDOCTYPE : IdentifiersTypes.CODE,
      IDENTIFIERDOC: People.SYSTEM,
      name : 'SYSTEM'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
    
    await People.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await People.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await People.migrateForeignKeyContraint(queryInterface,IdentifiersTypes);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(People.tableName);
  }
};