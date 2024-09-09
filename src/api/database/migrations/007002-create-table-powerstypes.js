'use strict';

const { Data_Origins } = require('../models/Data_Origins');
/*imports*/
const { PowersTypes } = require('../models/PowersTypes');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PowersTypes.runUpMigration(queryInterface);     

    await queryInterface.bulkInsert(PowersTypes.tableName,[{      
      id:PowersTypes.SYSTEM,
      status_reg_id: StatusRegs.ACTIVE,
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
    await queryInterface.dropTable(PowersTypes.tableName);
  }
};