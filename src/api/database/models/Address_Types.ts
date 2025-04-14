'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Address_Types extends BaseTableModel {

  //table fields
  declare name : string;


  static id = 2007;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static RESIDENTIAL = 1;
  static BUSINESS = 2;

  static fields = {
    ...Address_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Address_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Address_Types.tableName + '_u1',
      fields: [...Address_Types.getBaseTableModelUniqueFields(),...Address_Types.uniqueFields],
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