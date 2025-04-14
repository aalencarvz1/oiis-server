'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Gtin_Types extends BaseTableModel {

  //table fields
  declare name:  string;
  declare characters: number;
  declare description: string;


  static id = 8007;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static UNDEFINED = 1;
  static GTIN8 = 8;
  static GTIN12 = 12;
  static GTIN13 = 13;
  static GTIN14 = 14;

  static fields = {
    ...Gtin_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      characters: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(characters,0))`)
  ];

  static constraints = [...(Gtin_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Gtin_Types.tableName + '_u1',
      fields: [...Gtin_Types.getBaseTableModelUniqueFields(),...Gtin_Types.uniqueFields],
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