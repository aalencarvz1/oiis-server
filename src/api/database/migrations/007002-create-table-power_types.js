'use strict';

const { Data_Origins } = require('../models/Data_Origins');
/*imports*/
const { Power_Types } = require('../models/Power_Types');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Power_Types.runUpMigration(queryInterface);     

    await queryInterface.bulkInsert(Power_Types.tableName,[{      
      id:Power_Types.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });     

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Power_Types.tableName);
  }
};