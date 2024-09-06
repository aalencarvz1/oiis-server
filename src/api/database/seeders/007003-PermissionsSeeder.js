'use strict';

const { Modules } = require('../models/Modules');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { Permissions } = require('../models/Permissions');
const { PowersTypes } = require('../models/PowersTypes');
const { AccessesProfiles } = require('../models/AccessesProfiles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Permissions.name.toLowerCase(),[{      
      id:Users.SYSTEM,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPOWERTYPE: PowersTypes.SYSTEM,
      IDACCESSPROFILE: AccessesProfiles.SYSTEM,
      ALLOWEDACCESS: 1,
      ALLOWEDSEARCH: 1,
      ALLOWEDREAD: 1,
      ALLOWEDUPDATE: 1,
      ALLOWEDCREATE: 1,
      ALLOWEDDELETE: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Permissions.name.toLowerCase(), null, {});
  }
};
