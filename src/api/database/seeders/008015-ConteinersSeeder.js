'use strict';

const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const { Identifier_Types } = require('../models/Identifier_Types');
const { Conteiners } = require('../models/Conteiners');
const { Conteiner_Types } = require('../models/Conteiner_Types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Conteiners.tableName,[{
      id: Conteiners.WITHOUT_CONTEINER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDCONTENIERTYPE: Conteiner_Types.NO_CONTEINER,
      IDIDENTIFIERTYPE : Identifier_Types.IDENTIFIER,
      IDENTIFIER: Conteiners.WITHOUT_CONTEINER
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Conteiners.tableName, null, {});
  }
};
