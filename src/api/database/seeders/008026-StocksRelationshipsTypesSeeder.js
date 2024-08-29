'use strict';

const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { StocksEntitiesRelationshipsTypes } = require('../models/StocksEntitiesRelationshipsTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(StocksEntitiesRelationshipsTypes.name.toUpperCase(),[{
      ID: StocksEntitiesRelationshipsTypes.OWNER,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'OWNER',
      ISOWNER: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(StocksEntitiesRelationshipsTypes.name.toUpperCase(), null, {});
  }
};
