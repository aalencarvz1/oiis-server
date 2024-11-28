'use strict';

const { Projects_Items_Types } = require('../models/Projects_Items_Types');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { Users } = require('../models/Users');
const { Relationships } = require('../models/Relationships');
const { Relationship_Types } = require('../models/Relationship_Types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    
    await queryInterface.bulkInsert(Projects_Items_Types.tableName,[{      
      id:Projects_Items_Types.PLANNINGS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'PLANNINGS'
    },{      
      id:Projects_Items_Types.MANAGEMENTS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'MANAGEMENTS'
    },{      
      id:Projects_Items_Types.INICIATIVES,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.PLANNINGS,
      name : 'INICIATIVES'
    },{      
      id:Projects_Items_Types.EPICS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.INICIATIVES,
      name : 'EPICS'
    },{      
      id:Projects_Items_Types.FEATURES,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.EPICS,
      name : 'FEATURES'
    },{      
      id:Projects_Items_Types.REQUIREMENTS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.PLANNINGS,
      name : 'REQUIREMENTS'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });

    await queryInterface.bulkInsert(Relationships.tableName,[{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.EPICS,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.PLANNINGS,
    },{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.FEATURES,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.PLANNINGS,
    },{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.REQUIREMENTS,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.FEATURES,
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Projects_Items_Types.tableName, null, {});
  }
};
