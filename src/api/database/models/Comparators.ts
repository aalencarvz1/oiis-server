'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Comparators extends BaseTableModel {

  //table fields
  declare name : string;

  

  static id = 1005;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static EQUAL = 1;
  static DIFFERENT = 2;
  static IN = 3;
  static NOT_IN = 4;
  static LIKE = 5;
  static NOT_LIKE = 6;
  static GREATER = 7;
  static GREATER_EQUAL = 8;
  static SMALLER = 9;
  static SMALLER_EQUAL = 10;

  static fields = {
    ...Comparators.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name',
  ];

  static constraints = [...(Comparators.getBaseTableModelConstraints() || []),...[
    {
      name: Comparators.tableName + '_u1',
      fields: [...Comparators.getBaseTableModelUniqueFields(),...Comparators.uniqueFields],
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