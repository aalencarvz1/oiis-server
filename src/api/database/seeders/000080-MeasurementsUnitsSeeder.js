'use strict';

const { Greatnesses } = require('../models/Greatnesses');
const { MeasurementsUnits } = require('../models/MeasurementsUnits');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(MeasurementsUnits.name.toUpperCase(),[{
      ID: MeasurementsUnits.UN,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'UNIT',
      SIGLA: 'UN',
      ISSCALAR: 1
    },{
      ID: MeasurementsUnits.KG,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.MASS,
      NAME : 'KILOGRAM',
      SIGLA: 'KG',
      ISSCALAR: 1
    },{
      ID: MeasurementsUnits.L,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.VOLUM,
      NAME : 'LITER',
      SIGLA: 'L',
      ISSCALAR: 1
    },{
      ID: MeasurementsUnits.PC,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'PIECE',
      SIGLA: 'PC',
      ISSCALAR: 1
    },{
      ID: MeasurementsUnits.PKG,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'PACKAGE',
      SIGLA: 'PK',
      ISSCALAR: 1
    },{
      ID: MeasurementsUnits.BOX,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'BOX',
      SIGLA: 'BX',
      ISSCALAR: 1
    },{
      ID: MeasurementsUnits.BCK,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'BUCKET',
      SIGLA: 'BK',
      ISSCALAR: 1
    },{
      ID: MeasurementsUnits.CAN,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'CAN',
      SIGLA: 'CN',
      ISSCALAR: 1
    },{
      ID: MeasurementsUnits.BAG,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'BAG',
      SIGLA: 'BG',
      ISSCALAR: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(OriginsDatas.name.toUpperCase(), null, {});
  }
};
