'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Project_Task_Types  from "./Project_Task_Types.js";
import  Projects_Items  from "./Projects_Items.js";
import Utils from "../../controllers/utils/Utils.js";



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
  private static adjustedForeignKeys : boolean = false;
  

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
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      result.push({
        fields: ['project_item_id'],
        type: 'foreign key',
        references: { 
            table: Projects_Items,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['task_type_id'],
        type: 'foreign key',
        references: { 
            table: Project_Task_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }


  /**
   * static initializer block
   */
  static {
    //Utils.logi(this.name,'STATIC');
    this.foreignsKeys = this.getForeignKeys();
    //Utils.logf(this.name,'STATIC');
  }
     

};