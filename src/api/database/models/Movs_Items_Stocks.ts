'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Movements  from "./Movements.js";
import  Item_Stocks  from "./Item_Stocks.js";
import  Movement_Status  from "./Movement_Status.js";
import  Movement_Types  from "./Movement_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Movs_Items_Stocks extends BaseTableModel {

  //table fields
  declare mov_id: number;
  declare type_mov_id: number;
  declare stock_item_id: number;
  declare status_mov_id: number;
  declare mov_started_at: Date;
  declare mov_ended_at: Date;
  declare numeric_order: number;
  declare precedence: number;
  declare observations: string;



  static id = 9030;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Movs_Items_Stocks.getBaseTableModelFields(),...{                 
      mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      type_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      stock_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      status_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Movement_Status.NOT_STARTED
      },      
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
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
    'mov_id',
    'type_mov_id',
    'stock_item_id'
  ];

  static constraints = [...(Movs_Items_Stocks.getBaseTableModelConstraints() || []),...[
    {
      name: Movs_Items_Stocks.tableName + '_u1',
      fields: [...Movs_Items_Stocks.getBaseTableModelUniqueFields(),...Movs_Items_Stocks.uniqueFields],
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
      result.push({
        fields: ['mov_id'],
        type: 'foreign key',
        references: { 
            table: Movements,
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
        fields: ['stock_item_id'],
        type: 'foreign key',
        references: { 
            table: Item_Stocks,
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