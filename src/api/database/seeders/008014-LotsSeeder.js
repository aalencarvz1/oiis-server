'use strict';

const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const { Lots } = require('../models/Lots');
const { Identifier_Types } = require('../models/Identifier_Types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Lots.tableName,[{
      id: Lots.WITHOUT_LOT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDIDENTIFIERTYPE : Identifier_Types.IDENTIFIER,
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
