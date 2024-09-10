'use strict';

const { Modules } = require('../models/Modules');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const { Permissions } = require('../models/Permissions');
const { Power_Types } = require('../models/Power_Types');
const { Access_Profiles } = require('../models/Access_Profiles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Permissions.tableName,[{      
      id:Users.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDPOWERTYPE: Power_Types.SYSTEM,
      IDACCESSPROFILE: Access_Profiles.SYSTEM,
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
     await queryInterface.bulkDelete(Permissions.tableName, null, {});
  }
};
