'use strict';

const { ActionsStatus } = require('../models/ActionsStatus');
const { Modules } = require('../models/Modules');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(ActionsStatus.name.toUpperCase(),[{
      ID: ActionsStatus.NOT_STARTED,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'NOT STARTED'      
    },{
      ID: ActionsStatus.RUNNING,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : ActionsStatus.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'RUNNING',
      ISSTARTED: 1,
      ISRUNNING: 1
    },{
      ID: ActionsStatus.STOPED,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : ActionsStatus.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'STOPED',
      ISSTARTED: 1,
      ISSTOPED: 1
    },{
      ID: ActionsStatus.CANCELED,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : ActionsStatus.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'CANCELED',
      ISCANCELED: 1
    },{
      ID: ActionsStatus.CONCLUDED,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : ActionsStatus.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'CONCLUDED',
      ISCONCLUDED: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(OriginsDatas.name.toUpperCase(), null, {});
  }
};
