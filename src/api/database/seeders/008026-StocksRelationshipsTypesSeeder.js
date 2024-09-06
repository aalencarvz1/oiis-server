'use strict';

const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { StocksEntitiesRelationshipsTypes } = require('../models/StocksEntitiesRelationshipsTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(StocksEntitiesRelationshipsTypes.name.toLowerCase(),[{
      id: StocksEntitiesRelationshipsTypes.OWNER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      NAME : 'OWNER',
      ISOWNER: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(StocksEntitiesRelationshipsTypes.name.toLowerCase(), null, {});
  }
};
