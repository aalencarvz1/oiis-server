'use strict';


import  Record_Status  from "./Record_Status.js";
import  BasePeopleModel  from "./BasePeopleModel.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Companies extends BasePeopleModel {
  static id = 3000;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static #defaultCompany : any = null;

  static fields = {
    ...(Companies.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Companies.getBaseTableModelConstraints() || []),...[
    {
      name: Companies.tableName + '_u1',
      fields: [...Companies.getBaseTableModelUniqueFields(),...Companies.uniqueFields],
      type:"unique"
    }
  ]];
  
  static foreignsKeys : any[] = [];

  static async getDefaultCompany() {
    if (Companies.#defaultCompany == null) {
      Companies.#defaultCompany = await Companies.findOne({
        where:{
          status_reg_id : Record_Status.ACTIVE
        }
      });
    }
    return Companies.#defaultCompany;
  }


  
    

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