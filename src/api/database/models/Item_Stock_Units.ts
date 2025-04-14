'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Packagings  from "./Packagings.js";
import  Measurement_Units  from "./Measurement_Units.js";
import  Item_Status  from "./Item_Status.js";
import  Item_Stocks  from "./Item_Stocks.js";
import  Identifier_Types  from "./Identifier_Types.js";


/**
 * class model
 */
export default class Item_Stock_Units extends BaseTableModel {

  //table fields
  declare stock_item_id: number;
  declare identifier_type_id: number;
  declare identifier: string;
  declare item_unit_status_id: number;
  declare measurement_unit_id: number;
  declare packaging_id: number;
  declare unit_weight: number;      
  declare package_weight: number; 
  declare unit_volume: number;      
  declare package_volume: number;      
  declare amount: number;
  declare variable_unit_measure_id: number;
  declare variable_amount: number;



  static id = 8031;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Item_Stock_Units.getBaseTableModelFields(),...{           
      stock_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      },
      item_unit_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Item_Status.NORMAL
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      packaging_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      unit_weight:{
        type: DataTypes.DECIMAL(32,10)
      },      
      package_weight:{
        type: DataTypes.DECIMAL(32,10)
      }, 
      unit_volume:{
        type: DataTypes.DECIMAL(32,10)
      },      
      package_volume:{
        type: DataTypes.DECIMAL(32,10)
      },      
      amount:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      variable_unit_measure_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      variable_amount:{
        type: DataTypes.DECIMAL(32,10)
      }
    }
  };
  
  static uniqueFields = [
    'stock_item_id',
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
  ];

  static constraints = [...(Item_Stock_Units.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Stock_Units.tableName + '_u1',
      fields: [...Item_Stock_Units.getBaseTableModelUniqueFields(),...Item_Stock_Units.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['stock_item_id'],
      type: 'foreign key',
      references: { 
          table: Item_Stocks,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['item_unit_status_id'],
      type: 'foreign key',
      references: { 
          table: Item_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['measurement_unit_id'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['packaging_id'],
      type: 'foreign key',
      references: { 
          table: Packagings,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['variable_unit_measure_id'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
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