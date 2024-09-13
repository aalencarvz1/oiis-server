'use strict';

/*imports*/
const { Collaborators } = require('../models/Collaborators');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { People } = require('../models/People');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Collaborators.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
    
    await queryInterface.bulkInsert(Collaborators.tableName,[{      
      id:Collaborators.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      people_id : People.SYSTEM
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
    
    await Collaborators.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,People);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Collaborators.tableName);
  }
};