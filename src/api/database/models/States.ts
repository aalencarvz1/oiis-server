'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Countries  from "./Countries.js";

/**
 * class model
 */
export default class States extends BaseTableModel {

  //table fields
  declare country_id: number;
  declare name: string;
  declare sigla: string;


  static id = 2002;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...States.getBaseTableModelFields(),...{           
      country_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      sigla:{
        type: DataTypes.STRING(10)
      }
    }
  };
  
  static uniqueFields = [
    'country_id',
    'name'
  ];

  static constraints = [...(States.getBaseTableModelConstraints() || []),...[
    {
      name: States.tableName + '_u1',
      fields: [...States.getBaseTableModelUniqueFields(),...States.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['country_id'],
      type: 'foreign key',
      references: { 
          table: Countries,
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