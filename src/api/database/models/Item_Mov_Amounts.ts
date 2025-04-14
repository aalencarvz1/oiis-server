'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Measurement_Units  from "./Measurement_Units.js";
import  Packagings  from "./Packagings.js";
import  Movement_Status  from "./Movement_Status.js";
import  Movement_Types  from "./Movement_Types.js";
import  Movs_Items_Stocks  from "./Movs_Items_Stocks.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Item_Mov_Amounts extends BaseTableModel {

  //table fields
  declare mov_item_stock_id: number;
  declare type_mov_id: number;
  declare measurement_unit_id: number;
  declare packaging_id: number;
  declare unit_weight: number;      
  declare package_weight: number;      
  declare unit_volume: number;      
  declare package_volume: number;
  declare unit_value: number;  
  declare status_mov_id: number;
  declare mov_started_at: Date;
  declare mov_ended_at: Date;
  declare expected_amt: number;
  declare moved_amt: number;
  declare observations: string;


  static id = 9035;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Item_Mov_Amounts.getBaseTableModelFields(),...{                 
      mov_item_stock_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      type_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
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
      unit_value:{
        type: DataTypes.DECIMAL(32,10)
      },  
      status_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },      
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
      expected_amt:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      moved_amt:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'mov_item_stock_id',
    'type_mov_id',
    'measurement_unit_id',
    'packaging_id'
  ];

  static constraints = [...(Item_Mov_Amounts.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Mov_Amounts.tableName + '_u1',
      fields: [...Item_Mov_Amounts.getBaseTableModelUniqueFields(),...Item_Mov_Amounts.uniqueFields],
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
      result.push({
        fields: ['mov_item_stock_id'],
        type: 'foreign key',
        references: { 
            table: Movs_Items_Stocks,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['type_mov_id'],
        type: 'foreign key',
        references: { 
            table: Movement_Types,
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
        fields: ['packaging_id'],
        type: 'foreign key',
        references: { 
            table: Packagings,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['status_mov_id'],
        type: 'foreign key',
        references: { 
            table: Movement_Status,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
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