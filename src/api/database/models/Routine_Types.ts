'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Routine_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;



  static id = 210;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static SYSTEM = 1;
  static REGISTER = 2;
  static REPORT = 3;

  static fields = {
    ...Routine_Types.getBaseTableModelFields(),...{      
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [    
    'name'
  ];

  static constraints = [...(Routine_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Routine_Types.tableName + '_u1',
      fields: [...Routine_Types.getBaseTableModelUniqueFields(),...Routine_Types.uniqueFields],
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
      result = [];
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
