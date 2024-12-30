'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Project_Task_Types  from "./Project_Task_Types.js";
import  Projects_Items  from "./Projects_Items.js";
import  Utils  from "../../controllers/utils/Utils.js";
import  Record_Status  from "./Record_Status.js";
import  Users  from "./Users.js";
import  Data_Origins  from "./Data_Origins.js";
import  Relationship_Types  from "./Relationship_Types.js";
import  Relationships  from "./Relationships.js";
import  Requirements  from "./Requirements.js";
import { Request } from "express";



/**
 * class model
 */
export default class Project_Tasks extends BaseTableModel {

  //table fields
  declare project_item_id: number;    
  declare task_type_id: number;
  declare forecast_start_moment: Date;
  declare forecast_end_moment: Date;
  declare start_at: Date;
  declare end_at: Date;



  static id = 15051;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Project_Tasks.getBaseTableModelFields(),...{            
      project_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },    
      task_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Project_Task_Types.TASK
      },
      forecast_start_moment: {
        type: DataTypes.DATE
      },
      forecast_end_moment: {
        type: DataTypes.DATE
      },
      start_at: {
        type: DataTypes.DATE
      },
      end_at: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'project_item_id'
  ];

  static constraints = [...(Project_Tasks.getBaseTableModelConstraints() || []),...[
    {
      name: Project_Tasks.tableName + '_u1',
      fields: [...Project_Tasks.getBaseTableModelUniqueFields(),...Project_Tasks.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['project_item_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['task_type_id'],
      type: 'foreign key',
      references: { 
          table: Project_Task_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];



  static async createData(params: any, req?: any) {
    params = params || {};  
 
    if (!Utils.hasValue(params.project_item_id)) {
      let projectItem = null;
      let projectItemParams = {...params};
      if (Utils.hasValue(projectItemParams.parent_id)) {
        projectItemParams.parent_id = null;
        delete projectItemParams.parent_id;
      }
      if (Utils.hasValue(projectItemParams.project_item_parent_id)) {
        projectItemParams.parent_id = projectItemParams.project_item_parent_id;        
      } 
      projectItem = await Projects_Items.createData(projectItemParams);
      params.project_item_id = projectItem.id;
    } 
    
    let result = await BaseTableModel.createData.bind(Project_Tasks)(params);

    if (Utils.hasValue(params.requirements)) {
      let toUpsert = params.requirements.map((el:any)=>({
        status_reg_id: Record_Status.ACTIVE,
        creator_user_id : params.req?.user?.id || req?.user?.id || Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
        is_sys_rec : 0,
        relationship_type_id : Relationship_Types.SUBORDINATED,
        table_1_id: Project_Tasks.id,
        record_1_column: 'id',
        record_1_id: result.id,
        table_2_id: Requirements.id,
        record_2_column: 'id',
        record_2_id: el.id,
      }));

      await Relationships.bulkCreate(toUpsert,{
        ignoreDuplicates:true
      })
      
    }

    return result;
  }  
  static putData = this.createData;

  static async updateData(params: any) {
    params = params || {};  
    let projectItemParams = {...params,id:params.project_item_id};
    if (Utils.hasValue(projectItemParams.parent_id)) {
      projectItemParams.parent_id = null;
      delete projectItemParams.parent_id;
    }
    if (Utils.hasValue(projectItemParams.project_item_parent_id)) {
      projectItemParams.parent_id = projectItemParams.project_item_parent_id;        
    } 
    let projectItem = await Projects_Items.updateData(projectItemParams);
    return await BaseTableModel.updateData.bind(Project_Tasks)(params);
  }  
  static patchData = this.updateData;
  

  static async deleteData(params: any) {
    let records = await this.getData(params);
    let projectsIds = [];
    if (Utils.hasValue(records)) {
      projectsIds = records.map((el: any)=>el.project_item_id);
    }
    await BaseTableModel.deleteData.bind(Project_Tasks)(params);
    return Projects_Items.deleteData({queryParams:{where:{id:projectsIds}}});
  } 
};