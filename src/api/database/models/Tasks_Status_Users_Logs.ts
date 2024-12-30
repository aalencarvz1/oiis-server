'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Tasks_Status_Users  from "./Tasks_Status_Users.js";


/**
 * class model
 */
export default class Tasks_Status_Users_Logs extends BaseTableModel {

  //table fields
  declare task_status_user_id: number;
  declare operation: string;
  declare old_status_id : number;
  declare new_status_id : number;


  static id = 15151;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Tasks_Status_Users_Logs.getBaseTableModelFields(),...{            
      task_status_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      operation: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      old_status_id : {
        type: DataTypes.BIGINT.UNSIGNED
      },
      new_status_id : {
        type: DataTypes.BIGINT.UNSIGNED
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Tasks_Status_Users_Logs.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['task_status_user_id'],
      type: 'foreign key',
      references: { 
          table: Tasks_Status_Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};