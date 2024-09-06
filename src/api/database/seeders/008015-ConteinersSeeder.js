'use strict';

const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { IdentifiersTypes } = require('../models/IdentifiersTypes');
const { Conteiners } = require('../models/Conteiners');
const { ConteinersTypes } = require('../models/ConteinersTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Conteiners.name.toLowerCase(),[{
      id: Conteiners.WITHOUT_CONTEINER,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDCONTENIERTYPE: ConteinersTypes.NO_CONTEINER,
      IDIDENTIFIERTYPE : IdentifiersTypes.IDENTIFIER,
      IDENTIFIER: Conteiners.WITHOUT_CONTEINER
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Conteiners.name.toLowerCase(), null, {});
  }
};
