'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Sql_Object_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;


  static id = 10000;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static DATABASE = 1;
  static USER = 100;
  static SCHEMA = 200;
  static TABLE = 300;
  static FIELD = 400;
  static SELECT = 1000;
  static FROM = 1100;
  static JOIN = 1150;
  static ON = 1155;
  static WHERE = 1200;
  static GROUP_BY = 1300;
  static HAVING = 1400;
  static ORDER_BY = 1500;
  static PIVOT = 1600;
  static FOR = 1650;
  static IN = 1655;
  static TEXT = 10000;


  static fields = {
    ...Sql_Object_Types.getBaseTableModelFields(),...{            
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

  static constraints = [...(Sql_Object_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Sql_Object_Types.tableName + '_u1',
      fields: [...Sql_Object_Types.getBaseTableModelUniqueFields(),...Sql_Object_Types.uniqueFields],
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