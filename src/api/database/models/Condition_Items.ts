'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Conditions  from "./Conditions.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Condition_Items extends BaseTableModel {

  //table fields
  declare condition_id: number;
  declare value: string;
  declare expression: string;


  static id = 7005;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Condition_Items.getBaseTableModelFields(),...{           
      condition_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      value:{
        type: DataTypes.TEXT
      },
      expression: {
        type: DataTypes.TEXT
      }      
    }
  };

  static constraints = [...(Condition_Items.getBaseTableModelConstraints() || []),...[]];


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
        fields: ['condition_id'],
        type: 'foreign key',
        references: { 
            table: Conditions,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
