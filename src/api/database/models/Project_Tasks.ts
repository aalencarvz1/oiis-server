'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Project_Task_Types  from "./Project_Task_Types.js";
import  Projects_Items  from "./Projects_Items.js";



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

};