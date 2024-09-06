'use strict';

const { Greatnesses } = require('../models/Greatnesses');
const { MeasurementsUnits } = require('../models/MeasurementsUnits');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(MeasurementsUnits.name.toLowerCase(),[{
      id: MeasurementsUnits.UN,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'UNIT',
      SIGLA: 'UN',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.KG,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.MASS,
      NAME : 'KILOGRAM',
      SIGLA: 'KG',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.L,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.VOLUM,
      NAME : 'LITER',
      SIGLA: 'L',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.PC,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'PIECE',
      SIGLA: 'PC',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.PKG,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'PACKAGE',
      SIGLA: 'PK',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.BOX,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'BOX',
      SIGLA: 'BX',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.BCK,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'BUCKET',
      SIGLA: 'BK',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.CAN,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      NAME : 'CAN',
      SIGLA: 'CN',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.BAG,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
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
     await queryInterface.bulkDelete(OriginsDatas.name.toLowerCase(), null, {});
  }
};
