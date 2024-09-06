'use strict';

/*imports*/
const { AccessProfiles } = require('../models/AccessProfiles');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await AccessProfiles.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});

    await queryInterface.bulkInsert(AccessProfiles.tableName,[{      
      id:AccessProfiles.SYSTEM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM',
      allow_access_to_all_module_routines:1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 

    await AccessProfiles.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await AccessProfiles.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(AccessProfiles.tableName);
  }
};