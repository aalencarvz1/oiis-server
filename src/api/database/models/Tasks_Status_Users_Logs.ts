'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Tasks_Status_Users  from "./Tasks_Status_Users.js";
import Utils from "../../controllers/utils/Utils.js";


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
  static adjustedForeignKeys : boolean = false;
  

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


  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = super.getForeignKeys();
      result.push({
        fields: ['task_status_user_id'],
        type: 'foreign key',
        references: { 
            table: Tasks_Status_Users,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};