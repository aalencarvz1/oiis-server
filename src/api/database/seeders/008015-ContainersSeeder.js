'use strict';

const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const { Identifier_Types } = require('../models/Identifier_Types');
const { Containers } = require('../models/Containers');
const { Container_Types } = require('../models/Container_Types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Containers.tableName,[{
      id: Containers.WITHOUT_CONTEINER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      container_type_id: Container_Types.NO_CONTEINER,
      identifier_type_id : Identifier_Types.IDENTIFIER,
      identifier: Containers.WITHOUT_CONTEINER
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Containers.tableName, null, {});
  }
};
