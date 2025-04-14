'use strict';

import { DataTypes } from "sequelize";
import  BasePeopleModel  from "./BasePeopleModel.js";
import  Companies  from "./Companies.js";
import Utils from "../../controllers/utils/Utils.js";
/**
 * class model
 */
export default class Warehouses extends BasePeopleModel {

  //table fields
  declare company_id : number;


  static id = 3002;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...(Warehouses.getBaseTableModelFields() || {}),
    ...{           
      company_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Warehouses.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouses.tableName + '_u1',
      fields: [...Warehouses.getBaseTableModelUniqueFields(),...Warehouses.uniqueFields],
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
      result.push({
        fields: ['company_id'],
        type: 'foreign key',
        references: { 
            table: Companies,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
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