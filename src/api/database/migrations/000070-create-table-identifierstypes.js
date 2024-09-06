'use strict';

/*imports*/
const { IdentifiersTypes } = require('../models/IdentifiersTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await IdentifiersTypes.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                 
    
    await queryInterface.bulkInsert(IdentifiersTypes.name.toLowerCase(),[{      
      id:IdentifiersTypes.CODE,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CODE'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
    
    await IdentifiersTypes.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await IdentifiersTypes.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(IdentifiersTypes.name.toLowerCase());
  }
};