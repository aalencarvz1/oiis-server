'use strict';

const { ActionsStatus } = require('../models/ActionsStatus');
const { Modules } = require('../models/Modules');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(ActionsStatus.name.toLowerCase(),[{
      id: ActionsStatus.NOT_STARTED,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'NOT STARTED'      
    },{
      id: ActionsStatus.RUNNING,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : ActionsStatus.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'RUNNING',
      ISSTARTED: 1,
      ISRUNNING: 1
    },{
      id: ActionsStatus.STOPED,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : ActionsStatus.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'STOPED',
      ISSTARTED: 1,
      ISSTOPED: 1
    },{
      id: ActionsStatus.CANCELED,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : ActionsStatus.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CANCELED',
      ISCANCELED: 1
    },{
      id: ActionsStatus.CONCLUDED,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : ActionsStatus.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'CONCLUDED',
      ISCONCLUDED: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(OriginsDatas.name.toLowerCase(), null, {});
  }
};
