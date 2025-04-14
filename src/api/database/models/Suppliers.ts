'use strict';


import Utils from "../../controllers/utils/Utils.js";
import  BasePeopleModel  from "./BasePeopleModel.js";

/**
 * class model
 */
export default class Suppliers extends BasePeopleModel {
  static id = 5000;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...(Suppliers.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Suppliers.getBaseTableModelConstraints() || []),...[
    {
      name: Suppliers.tableName + '_u1',
      fields: [...Suppliers.getBaseTableModelUniqueFields(),...Suppliers.uniqueFields],
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