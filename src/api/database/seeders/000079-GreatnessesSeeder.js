'use strict';

const { Greatnesses } = require('../models/Greatnesses');
const { Modules } = require('../models/Modules');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Greatnesses.tableName,[{
      id: Greatnesses.QUANTITY,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'QUANTITY',
      SIGLA: 'QT',
      ISSCALAR:1
    },{
      id: Greatnesses.MASS,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'MASS',
      SIGLA: 'M',
      ISSCALAR:1
    },{
      id: Greatnesses.VOLUM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'VOLUM',
      SIGLA: 'V',
      ISSCALAR:1
    },{
      id: Greatnesses.LENGTH,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'LENGTH',
      SIGLA: 'L',
      ISSCALAR:1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Data_Origins.tableName, null, {});
  }
};
