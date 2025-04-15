'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Packagings  from "./Packagings.js";
import  Measurement_Units  from "./Measurement_Units.js";
import  Stock_Entities  from "./Stock_Entities.js";
import  Items  from "./Items.js";
import  Item_Stocks  from "./Item_Stocks.js";
import  Identifier_Types  from "./Identifier_Types.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Item_Meas_Pack_Identif extends BaseTableModel {

  //table fields
  declare item_id: number;
  declare packaging_id: number;
  declare measurement_unit_id: number; 
  declare unit_weight:number;       
  declare package_weight:number; 
  declare unit_volume:number;       
  declare package_volume:number;             
  declare identifier_type_id: number;
  declare identifier: string;
  declare multiplier: number;
  declare stock_item_id: number;      
  declare stock_entity_id: number;      
  declare numeric_order: number;



  static id = 8032;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Item_Meas_Pack_Identif.getBaseTableModelFields(),...{           
      item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      packaging_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      measurement_unit_id:{
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
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      },
      multiplier:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:1
      },
      stock_item_id:{
        type: DataTypes.BIGINT.UNSIGNED        
      },      
      stock_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'item_id',
    'packaging_id',
    Sequelize.literal(`(COALESCE(measurement_unit_id,0))`),
    Sequelize.literal(`(COALESCE(identifier_type_id,0))`),
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`),
    'multiplier',
    Sequelize.literal(`(COALESCE(stock_item_id,0))`),
    Sequelize.literal(`(COALESCE(stock_entity_id,0))`)
  ];

  static constraints = [...(Item_Meas_Pack_Identif.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Meas_Pack_Identif.tableName + '_u1',
      fields: [...Item_Meas_Pack_Identif.getBaseTableModelUniqueFields(),...Item_Meas_Pack_Identif.uniqueFields],
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
      result = super.getForeignKeys();
      result.push({
        fields: ['item_id'],
        type: 'foreign key',
        references: { 
            table: Items,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['packaging_id'],
        type: 'foreign key',
        references: { 
            table: Packagings,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['measurement_unit_id'],
        type: 'foreign key',
        references: { 
            table: Measurement_Units,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['identifier_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });   
      result.push({
        fields: ['stock_item_id'],
        type: 'foreign key',
        references: { 
            table: Item_Stocks,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['stock_entity_id'],
        type: 'foreign key',
        references: { 
            table: Stock_Entities,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }     
};