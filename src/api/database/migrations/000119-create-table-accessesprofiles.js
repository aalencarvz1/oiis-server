'use strict';

/*imports*/
const { AccessesProfiles } = require('../models/AccessesProfiles');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await AccessesProfiles.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});

    await queryInterface.bulkInsert(AccessesProfiles.name.toLowerCase(),[{      
      id:AccessesProfiles.SYSTEM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM',
      ALLOWACESSALLROUTINESOFMODULE:1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 

    await AccessesProfiles.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await AccessesProfiles.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(AccessesProfiles.name.toLowerCase());
  }
};