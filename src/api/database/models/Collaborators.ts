'use strict';


import Utils from "../../controllers/utils/Utils.js";
import BasePeopleModel from "./BasePeopleModel.js";



/**
 * class model
 */
export default class Collaborators extends BasePeopleModel {
  static id = 110;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static SYSTEM = 1;
  
  static fields = {
    ...(Collaborators.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Collaborators.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborators.tableName + '_u1',
      fields: [...Collaborators.getBaseTableModelUniqueFields(),...Collaborators.uniqueFields],
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
