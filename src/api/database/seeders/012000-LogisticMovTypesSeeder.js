'use strict';

const { LogisticMovTypes } = require('../models/LogisticMovTypes');
const { Modules } = require('../models/Modules');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(LogisticMovTypes.tableName,[{
      id: LogisticMovTypes.DELIVERY,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'DELIVERY',
      ISOUTPUT:1
    },{
      id: LogisticMovTypes.COLLECT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : LogisticMovTypes.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'COLLECT',
      ISINPUT: 1
    },{
      id: LogisticMovTypes.RETREAT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : LogisticMovTypes.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'RETREAT',
      ISINPUT: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Data_Origins.tableName, null, {});
  }
};
