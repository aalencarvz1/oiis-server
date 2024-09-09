'use strict';

/*imports*/
const { Access_Profiles } = require('../models/Access_Profiles');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Access_Profiles.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});

    await queryInterface.bulkInsert(Access_Profiles.tableName,[{      
      id:Access_Profiles.SYSTEM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM',
      allow_access_to_all_module_routines:1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 

    await Access_Profiles.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Access_Profiles.migrateForeignKeyContraint(queryInterface,Data_Origins);  
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Access_Profiles.tableName);
  }
};