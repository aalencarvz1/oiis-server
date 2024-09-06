'use strict';

const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { Lots } = require('../models/Lots');
const { IdentifiersTypes } = require('../models/IdentifiersTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Lots.tableName,[{
      id: Lots.WITHOUT_LOT,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDIDENTIFIERTYPE : IdentifiersTypes.IDENTIFIER,
      IDENTIFIER: Lots.WITHOUT_LOT
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Lots.tableName, null, {});
  }
};
