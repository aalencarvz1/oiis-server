'use strict';

import  Projects_Items_Types  from '../models/Projects_Items_Types.js';
import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import  Relationships  from '../models/Relationships.js';
import  Relationship_Types  from '../models/Relationship_Types.js';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    
    await queryInterface.bulkInsert(Projects_Items_Types.tableName,[{
      id: Projects_Items_Types.PROJECTS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'PROJECTS'
    },{
      id: Projects_Items_Types.PROJECT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id: Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec: 1,
      parent_id: Projects_Items_Types.PROJECTS,
      name: 'PROJECT'
    },{
      id:Projects_Items_Types.PLANNINGS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.PROJECT,
      name : 'PLANNINGS'
    },{
      id:Projects_Items_Types.PLANNING,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.PLANNINGS,
      name : 'PLANNING'
    },{      
      id:Projects_Items_Types.MANAGEMENTS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.PROJECT,
      name : 'MANAGEMENTS'
    },{      
      id:Projects_Items_Types.MANAGEMENT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.MANAGEMENTS,
      name : 'MANAGEMENT'
    },{      
      id:Projects_Items_Types.INICIATIVES,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.PLANNING,
      name : 'INICIATIVES'
    },{      
      id:Projects_Items_Types.INICIATIVE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.INICIATIVES,
      name : 'INICIATIVE'
    },{      
      id:Projects_Items_Types.EPICS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.INICIATIVE,
      name : 'EPICS'
    },{      
      id:Projects_Items_Types.EPIC,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.EPICS,
      name : 'EPIC'
    },{      
      id:Projects_Items_Types.FEATURES,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.EPIC,
      name : 'FEATURES'
    },{      
      id:Projects_Items_Types.FEATURE,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.FEATURES,
      name : 'FEATURE'
    },{      
      id:Projects_Items_Types.REQUIREMENTS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.FEATURE,
      name : 'REQUIREMENTS'
    },{      
      id:Projects_Items_Types.REQUIREMENT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.REQUIREMENTS,
      name : 'REQUIREMENT'
    },{      
      id:Projects_Items_Types.AGILE_METHODOLOGIES,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.MANAGEMENT,
      name : 'AGILE METHODOLOGIES'
    },{      
      id:Projects_Items_Types.AGILE_METHODOLOGY,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.AGILE_METHODOLOGIES,
      name : 'AGILE METHODOLOGY'
    },{      
      id:Projects_Items_Types.SCRUMS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.AGILE_METHODOLOGY,
      name : 'SCRUMS'
    },{      
      id:Projects_Items_Types.SCRUM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.SCRUMS,
      name : 'SCRUM'
    },{      
      id:Projects_Items_Types.BACKLOGS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.SCRUM,
      name : 'BACKLOGS'
    },{      
      id:Projects_Items_Types.BACKLOG,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.BACKLOGS,
      name : 'BACKLOG'
    },{      
      id:Projects_Items_Types.SPRINTS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.SCRUM,
      name : 'SPRINTS'
    },{      
      id:Projects_Items_Types.SPRINT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.SPRINTS,
      name : 'SPRINT'
    },{      
      id:Projects_Items_Types.TASKS,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.SPRINT,
      name : 'TASKS'
    },{      
      id:Projects_Items_Types.TASK,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Projects_Items_Types.TASKS,
      name : 'TASK'
    }],{
      ignoreDuplicates:true
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
      record_1_id: Projects_Items_Types.REQUIREMENTS,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.PROJECT,
    },{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.TASKS,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.PROJECT,
    },{      
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
      record_2_id: Projects_Items_Types.PLANNING,
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
      record_2_id: Projects_Items_Types.PLANNING,
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
      record_2_id: Projects_Items_Types.PLANNING,
    },{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.SCRUMS,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.MANAGEMENT,
    },{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.SCRUM,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.MANAGEMENT,
    },{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.TASKS,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.MANAGEMENT,
    },{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.BACKLOG,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.SCRUM,
    },{      
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      relationship_type_id : Relationship_Types.SUBORDINATED,
      table_1_id: Projects_Items_Types.id,
      record_1_column: 'id',
      record_1_id: Projects_Items_Types.TASKS,
      table_2_id: Projects_Items_Types.id,
      record_2_column: 'parent_id',
      record_2_id: Projects_Items_Types.BACKLOG,
    }],{
      ignoreDuplicates:true
    });
     
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Projects_Items_Types.tableName, {});
  }
};
