'use strict';

const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { Lots } = require('../models/Lots');
const { IdentifiersTypes } = require('../models/IdentifiersTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Lots.name.toUpperCase(),[{
      ID: Lots.WITHOUT_LOT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDIDENTIFIERTYPE : IdentifiersTypes.IDENTIFIER,
      IDENTIFIER: Lots.WITHOUT_LOT
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Lots.name.toUpperCase(), null, {});
  }
};
