'use strict';

const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const { Stock_Entity_Relationship_Types } = require('../models/Stock_Entity_Relationship_Types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Stock_Entity_Relationship_Types.tableName,[{
      id: Stock_Entity_Relationship_Types.OWNER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'OWNER',
      ISOWNER: 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Stock_Entity_Relationship_Types.tableName, null, {});
  }
};
