'use strict';

const { LogisticMovTypes } = require('../models/LogisticMovTypes');
const { Modules } = require('../models/Modules');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(LogisticMovTypes.name.toUpperCase(),[{
      ID: LogisticMovTypes.DELIVERY,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'DELIVERY',
      ISOUTPUT:1
    },{
      ID: LogisticMovTypes.COLLECT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : LogisticMovTypes.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'COLLECT',
      ISINPUT: 1
    },{
      ID: LogisticMovTypes.RETREAT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : LogisticMovTypes.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'RETREAT',
      ISINPUT: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(OriginsDatas.name.toUpperCase(), null, {});
  }
};
