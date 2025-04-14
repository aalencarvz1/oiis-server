'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Project_Task_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare notes: string;


  static id = 15050;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static TASK = 1;
  static DOCUMENTATION = 2;
  static PLANNING = 3;
  static EXECUTION = 4;
  static DEVELOPMENT = 5;
  static IMPROVEMENT = 6;
  static CORRECTION = 7;

  static fields = {
    ...Project_Task_Types.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      notes: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Project_Task_Types.getBaseTableModelConstraints() || []),...[{
    name: Project_Task_Types.tableName + '_u1',
    fields: [...Project_Task_Types.getBaseTableModelUniqueFields(),...Project_Task_Types.uniqueFields],
    type:"unique"
  }]];

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
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
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