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
    await queryInterface.bulkInsert(Conteiners.name.toUpperCase(),[{
      ID: Conteiners.WITHOUT_CONTEINER,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDCONTENIERTYPE: ConteinersTypes.NO_CONTEINER,
      IDIDENTIFIERTYPE : IdentifiersTypes.IDENTIFIER,
      IDENTIFIER: Conteiners.WITHOUT_CONTEINER
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Conteiners.name.toUpperCase(), null, {});
  }
};
