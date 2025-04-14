'use strict';

import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Packagings  from "./Packagings.js";
import  Measurement_Units  from "./Measurement_Units.js";
import  Item_Status  from "./Item_Status.js";
import  Warehouse_Addresses  from "./Warehouse_Addresses.js";
import  Stock_Entity_Relationship_Types  from "./Stock_Entity_Relationship_Types.js";
import  Stock_Entities  from "./Stock_Entities.js";
import  Items_Lots_Containers  from "./Items_Lots_Containers.js";



/**
 * class model
 */
export default class Item_Stocks extends BaseTableModel{

  //table fields
  declare item_lot_container_id: number;
  declare stock_relationship_type_id: number;
  declare stock_entity_id: number;
  declare warehouse_address_id: number;
  declare item_stock_status_id: number;
  declare measurement_unit_id: number;
  declare packaging_id: number;
  declare unit_weight: number;      
  declare package_weight: number;      
  declare unit_volume: number;      
  declare package_volume: number;      
  declare amount: number;
  declare numeric_order: number;
  declare precedence: number;
  declare observations: string;



  static id = 8030;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Item_Stocks.getBaseTableModelFields(),...{           
      item_lot_container_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      stock_relationship_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Stock_Entity_Relationship_Types.OWNER
      },
      stock_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false        
      },
      warehouse_address_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      item_stock_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Item_Status.NORMAL
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      packaging_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
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
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      precedence:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'item_lot_container_id',
    'stock_relationship_type_id',
    'stock_entity_id',
    Sequelize.literal(`(COALESCE(warehouse_address_id,0))`),
    'item_stock_status_id',
    'measurement_unit_id',
    'packaging_id'
  ];

  static constraints = [...(Item_Stocks.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Stocks.tableName + '_u1',
      fields: [...Item_Stocks.getBaseTableModelUniqueFields(),...Item_Stocks.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['item_lot_container_id'],
      type: 'foreign key',
      references: { 
          table: Items_Lots_Containers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['stock_relationship_type_id'],
      type: 'foreign key',
      references: { 
          table: Stock_Entity_Relationship_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['stock_entity_id'],
      type: 'foreign key',
      references: { 
          table: Stock_Entities,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['warehouse_address_id'],
      type: 'foreign key',
      references: { 
          table: Warehouse_Addresses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['item_stock_status_id'],
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