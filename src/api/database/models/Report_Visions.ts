'use strict';


import  { DataTypes, Op, QueryTypes}  from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import DBConnectionManager from "../DBConnectionManager.js";
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Report_Visions extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare is_visible: number;


  static id = 10002;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static VALUES = 1;
  static ORIGIN_DATA = 2;
  static COMPANY = 3;
  static BUSINESS_UNIT = 4;
  static SUPPLIER = 5;
  static CITY = 6;
  static SUPERVISOR = 7;
  static SELLER = 8;
  static BUSINESS_AREA = 9;
  static DEPARTMENT = 10;
  static PRODUCT = 11;
  static EVOLUTION = 12;
  static CLIENT = 13;
  static NETWORK_CLIENT = 14;
  static ROUTE = 15;
  static SQUARE = 16;
  static INVOICE = 17;
  static ITEM_INVOICE = 18;
  static ORIGIN_BUSINESS = 19;
  static ORIGIN_CATEGORY = 20;
  static PLATE = 21;


  static fields = {
    ...Report_Visions.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      is_visible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Report_Visions.getBaseTableModelConstraints() || []),...[{
    name: Report_Visions.tableName + '_u1',
    fields: [...Report_Visions.getBaseTableModelUniqueFields(),...Report_Visions.uniqueFields],
    type:"unique"
  },{
    name: Report_Visions.tableName + '_c_1',
    fields:['is_visible'],
    type:"check",
    where:{
      is_visible: {
            [Op.in]: [0,1]
        }
    }
  }]];

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