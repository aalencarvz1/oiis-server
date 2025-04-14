'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Languages from "./Languages.js";


/**
 * class model
 */
export default class Texts extends BaseTableModel {

  //table fields 
  declare language_id: number;
  declare text: string;


  static id = 249;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Texts.getBaseTableModelFields(),...{     
      language_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING(2000),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['language_id'],
      type: 'foreign key',
      references: { 
          table: Languages,
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
