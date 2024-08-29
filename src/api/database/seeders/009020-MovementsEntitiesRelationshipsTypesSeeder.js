'use strict';

const { MovementsEntitiesRelationshipsTypes } = require('../models/MovementsEntitiesRelationshipsTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(MovementsEntitiesRelationshipsTypes.name.toUpperCase(),[{
      ID:MovementsEntitiesRelationshipsTypes.ORIGIN_INPUT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'ORIGIN_INPUT',
      ISORIGIN : 1,
      ISTARGET : 0,
      ISINPUT : 1,
      ISOUTPUT : 0
    },{
      ID:MovementsEntitiesRelationshipsTypes.TARGET_INPUT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'TARGET_INPUT',
      ISORIGIN : 0,
      ISTARGET : 1,
      ISINPUT : 1,
      ISOUTPUT : 0
    },{
      ID:MovementsEntitiesRelationshipsTypes.ORIGIN_OUTPUT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'ORIGIN_OUTPUT',
      ISORIGIN : 1,
      ISTARGET : 0,
      ISINPUT : 0,
      ISOUTPUT : 1
    },{
      ID:MovementsEntitiesRelationshipsTypes.TARGET_OUTPUT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'TARGET_OUTPUT',
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
     await queryInterface.bulkDelete(MovementsEntitiesRelationshipsTypes.name.toUpperCase(), null, {});
  }
};
