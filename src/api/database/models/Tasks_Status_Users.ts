'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Tasks  from "./Tasks.js";
import  Users  from "./Users.js";
import  Task_Status  from "./Task_Status.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Tasks_Status_Users extends BaseTableModel {

  //table fields
  declare task_id: number;       
  declare user_id: number;
  declare status_id : number;
  declare triggering_task_id : number;
  declare forecast_start_moment: Date;
  declare forecast_end_moment: Date;
  declare start_at: Date;
  declare end_at: Date;
  declare last_run: Date;
  declare accumulated_time: number;
  declare observations: string;


  static id = 15150;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Tasks_Status_Users.getBaseTableModelFields(),...{            
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
      triggering_task_id : {
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
      observations: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'task_id',
    'user_id',
    'status_id'
  ];

  static constraints = [...(Tasks_Status_Users.getBaseTableModelConstraints() || []),...[]];

  
  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }       
      result.push({
        fields: ['task_id'],
        type: 'foreign key',
        references: { 
            table: Tasks,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['user_id'],
        type: 'foreign key',
        references: { 
            table: Users,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['status_id'],
        type: 'foreign key',
        references: { 
            table: Task_Status,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['triggering_task_id'],
        type: 'foreign key',
        references: { 
            table: Tasks,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      });
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    return result;
  }


  /**
   * static initializer block
   */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }
     
  
};