'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Movement_Groups  from "./Movement_Groups.js";
import  Movements  from "./Movements.js";

/**
 * class model
 */
export default class Movements_Groups extends BaseTableModel {

  //table fields
  declare movement_group_id: number;
  declare mov_id: number;
  declare numeric_order: number;
  declare precedence: number;
  declare observations: string;


  static id = 9012;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Movements_Groups.getBaseTableModelFields(),...{           
      movement_group_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      precedence:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'movement_group_id',
    'mov_id'
  ];

  static constraints = [...(Movements_Groups.getBaseTableModelConstraints() || []),...[
    {
      name: Movements_Groups.tableName + '_u1',
      fields: [...Movements_Groups.getBaseTableModelUniqueFields(),...Movements_Groups.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['movement_group_id'],
      type: 'foreign key',
      references: { 
          table: Movement_Groups,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['mov_id'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade'
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