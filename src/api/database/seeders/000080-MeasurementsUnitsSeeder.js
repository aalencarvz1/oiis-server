'use strict';

const { Greatnesses } = require('../models/Greatnesses');
const { MeasurementsUnits } = require('../models/MeasurementsUnits');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(MeasurementsUnits.tableName,[{
      id: MeasurementsUnits.UN,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      name : 'UNIT',
      SIGLA: 'UN',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.KG,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.MASS,
      name : 'KILOGRAM',
      SIGLA: 'KG',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.L,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.VOLUM,
      name : 'LITER',
      SIGLA: 'L',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.PC,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      name : 'PIECE',
      SIGLA: 'PC',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.PKG,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      name : 'PACKAGE',
      SIGLA: 'PK',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.BOX,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      name : 'BOX',
      SIGLA: 'BX',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.BCK,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      name : 'BUCKET',
      SIGLA: 'BK',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.CAN,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      name : 'CAN',
      SIGLA: 'CN',
      ISSCALAR: 1
    },{
      id: MeasurementsUnits.BAG,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDGREATNESS: Greatnesses.QUANTITY,
      name : 'BAG',
      SIGLA: 'BG',
      ISSCALAR: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Data_Origins.tableName, null, {});
  }
};
