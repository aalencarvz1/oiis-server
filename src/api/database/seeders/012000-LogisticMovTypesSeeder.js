'use strict';

const { LogisticMovTypes } = require('../models/LogisticMovTypes');
const { Modules } = require('../models/Modules');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(LogisticMovTypes.name.toLowerCase(),[{
      id: LogisticMovTypes.DELIVERY,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'DELIVERY',
      ISOUTPUT:1
    },{
      id: LogisticMovTypes.COLLECT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : LogisticMovTypes.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'COLLECT',
      ISINPUT: 1
    },{
      id: LogisticMovTypes.RETREAT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : LogisticMovTypes.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'RETREAT',
      ISINPUT: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(OriginsDatas.name.toLowerCase(), null, {});
  }
};
