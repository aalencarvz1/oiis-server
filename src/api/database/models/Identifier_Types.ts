'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Identifier_Types extends BaseTableModel {

  //table fiels
  declare name: string;
  declare description: string;
  declare process_to_validate: string;


  static id = 70;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static IDENTIFIER = 1;
  static CODE = 2;
  static CNPJ = 3;
  static CPF = 4;
  static CHAVENFE = 5;
  static GTIN = 10;
  static GTINTYPE = 11;
  static PACKAGING = 8001;
  static SUPPLIER = 5000; 
  static VALUE = 20;
  static WINTHORCODE = 30;
  static WINTHORCODEFAB = 31;
  
  static fields = {
    ...Identifier_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      process_to_validate: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Identifier_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Identifier_Types.tableName + '_u1',
      fields: [...Identifier_Types.getBaseTableModelUniqueFields(),...Identifier_Types.uniqueFields],
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
