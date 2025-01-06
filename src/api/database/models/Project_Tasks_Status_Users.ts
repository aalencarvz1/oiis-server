'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Users  from "./Users.js";
import  Task_Status  from "./Task_Status.js";
import  Project_Tasks  from "./Project_Tasks.js";


/**
 * class model
 */
export default class Project_Tasks_Status_Users extends BaseTableModel {

  //table fields
  declare task_id: number;       
  declare user_id: number;
  declare status_id : number;
  declare triggering_id : number;
  declare forecast_start_moment: Date;
  declare forecast_end_moment: Date;
  declare start_at: Date;
  declare end_at: Date;
  declare last_run: Date;
  declare accumulated_time : number;
  declare notes: string;


  static id = 15152;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Project_Tasks_Status_Users.getBaseTableModelFields(),...{            
      task_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },       
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      status_id : {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
        defaultValue: Task_Status.NOT_STARTED
      },
      triggering_id : {
        type: DataTypes.BIGINT.UNSIGNED
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
      },
      last_run: {
        type: DataTypes.DATE
      },
      accumulated_time : {
        type: DataTypes.BIGINT
      },
      notes: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'task_id',
    'user_id'
  ];

  static constraints = [...(Project_Tasks_Status_Users.getBaseTableModelConstraints() || []),...[{
    name: Project_Tasks_Status_Users.tableName + '_u1',
    fields: [...Project_Tasks_Status_Users.getBaseTableModelUniqueFields(),...Project_Tasks_Status_Users.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['task_id'],
      type: 'foreign key',
      references: { 
          table: Project_Tasks,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['user_id'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['status_id'],
      type: 'foreign key',
      references: { 
          table: Task_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['triggering_id'],
      type: 'foreign key',
      references: { 
          table: Project_Tasks_Status_Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    }    
  ]];
  
};