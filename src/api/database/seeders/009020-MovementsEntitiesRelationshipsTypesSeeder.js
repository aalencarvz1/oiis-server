'use strict';

const { MovementsEntitiesRelationshipsTypes } = require('../models/MovementsEntitiesRelationshipsTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(MovementsEntitiesRelationshipsTypes.name.toLowerCase(),[{
      id:MovementsEntitiesRelationshipsTypes.ORIGIN_INPUT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ORIGIN_INPUT',
      ISORIGIN : 1,
      ISTARGET : 0,
      ISINPUT : 1,
      ISOUTPUT : 0
    },{
      id:MovementsEntitiesRelationshipsTypes.TARGET_INPUT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'TARGET_INPUT',
      ISORIGIN : 0,
      ISTARGET : 1,
      ISINPUT : 1,
      ISOUTPUT : 0
    },{
      id:MovementsEntitiesRelationshipsTypes.ORIGIN_OUTPUT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'ORIGIN_OUTPUT',
      ISORIGIN : 1,
      ISTARGET : 0,
      ISINPUT : 0,
      ISOUTPUT : 1
    },{
      id:MovementsEntitiesRelationshipsTypes.TARGET_OUTPUT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'TARGET_OUTPUT',
      ISORIGIN : 0,
      ISTARGET : 1,
      ISINPUT : 0,
      ISOUTPUT : 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(MovementsEntitiesRelationshipsTypes.name.toLowerCase(), null, {});
  }
};
