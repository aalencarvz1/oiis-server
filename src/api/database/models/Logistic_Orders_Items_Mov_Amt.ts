'use strict';

import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Movement_Status  from "./Movement_Status.js";
import  Logistic_Mov_Types  from "./Logistic_Mov_Types.js";
import  Action_Status  from "./Action_Status.js";
import  Item_Mov_Amounts  from "./Item_Mov_Amounts.js";
import  Logistic_Orders_Movs  from "./Logistic_Orders_Movs.js";
import  Logistic_Reasons  from "./Logistic_Reasons.js";
import  Logistic_Status  from "./Logistic_Status.js";
import  Measurement_Units  from "./Measurement_Units.js";
import  Movement_Types  from "./Movement_Types.js";
import  Packagings  from "./Packagings.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Logistic_Orders_Items_Mov_Amt extends BaseTableModel {

  //table fields
  declare mov_logistic_order_id: number;
  declare item_mov_amt_id: number;
  declare logistic_mov_type_id: number; 
  declare action_status_id: number;
  declare type_mov_id: number;
  declare logistic_status_id: number;
  declare measurement_unit_id: number;
  declare packaging_id: number;  
  declare unit_weight: number;      
  declare package_weight: number;   
  declare unit_volume: number;      
  declare package_volume: number;        
  declare mov_started_at: Date;
  declare mov_ended_at: Date;
  declare expected_amt: number;
  declare moved_amt: number;
  declare unmoved_qty: number;
  declare collected_qty: number;
  declare unmoved_reason_id: number;
  declare collected_reason_id: number;
  declare unmoved_qty_notes: string;
  declare collected_qty_notes: string;
  declare unmoved_photos: string;
  declare collected_photos: string;



  static id = 12005;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Logistic_Orders_Items_Mov_Amt.getBaseTableModelFields(),...{           
      mov_logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      item_mov_amt_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      logistic_mov_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      action_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      type_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      logistic_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
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
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
      expected_amt:{
        type: DataTypes.DECIMAL(32,10)
      },
      moved_amt:{
        type: DataTypes.DECIMAL(32,10)
      },
      unmoved_qty:{
        type: DataTypes.DECIMAL(32,10)
      },
      collected_qty:{
        type: DataTypes.DECIMAL(32,10)
      },
      unmoved_reason_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      collected_reason_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      unmoved_qty_notes:{
        type: DataTypes.TEXT
      },
      collected_qty_notes:{
        type: DataTypes.TEXT
      },
      unmoved_photos:{
        type: DataTypes.TEXT
      },
      collected_photos:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'mov_logistic_order_id',
    'item_mov_amt_id',
    Sequelize.literal(`(COALESCE(logistic_mov_type_id,0))`),
    'action_status_id',
    Sequelize.literal(`(COALESCE(type_mov_id,0))`),
    Sequelize.literal(`(COALESCE(measurement_unit_id,0))`),
    Sequelize.literal(`(COALESCE(packaging_id,0))`)
  ];

  static constraints = [...(Logistic_Orders_Items_Mov_Amt.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_Items_Mov_Amt.tableName + '_u1',
      fields: [...Logistic_Orders_Items_Mov_Amt.getBaseTableModelUniqueFields(),...Logistic_Orders_Items_Mov_Amt.uniqueFields],
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
        fields: ['mov_logistic_order_id'],
        type: 'foreign key',
        references: { 
            table: Logistic_Orders_Movs,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['item_mov_amt_id'],
        type: 'foreign key',
        references: { 
            table: Item_Mov_Amounts,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['logistic_mov_type_id'],
        type: 'foreign key',
        references: { 
            table: Logistic_Mov_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['action_status_id'],
        type: 'foreign key',
        references: { 
            table: Action_Status,
            field: 'id'
        },
        onUpdate: 'cascade'
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
        fields: ['logistic_status_id'],
        type: 'foreign key',
        references: { 
            table: Logistic_Status,
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
        fields: ['unmoved_reason_id'],
        type: 'foreign key',
        references: { 
            table: Logistic_Reasons,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['collected_reason_id'],
        type: 'foreign key',
        references: { 
            table: Logistic_Reasons,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};