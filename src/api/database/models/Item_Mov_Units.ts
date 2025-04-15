'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Measurement_Units  from "./Measurement_Units.js";
import  Packagings  from "./Packagings.js";
import  Movement_Status  from "./Movement_Status.js";
import  Item_Mov_Amounts  from "./Item_Mov_Amounts.js";
import  Identifier_Types  from "./Identifier_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Item_Mov_Units extends BaseTableModel {

  //table fields
  declare item_mov_amt_id: number;
  declare identifier_type_id: number;
  declare identifier: string;
  declare measurement_unit_id: number;      
  declare packaging_id: number;  
  declare unit_weight: number;      
  declare package_weight: number;  
  declare unit_volume: number;      
  declare package_volume: number;              
  declare status_mov_id: number;      
  declare mov_started_at: Date;
  declare mov_ended_at: Date;
  declare expected_amt: number;
  declare moved_amt: number;
  declare variable_unit_measure_id: number;
  declare variable_expected_amt: number;
  declare variable_moved_amt: number;
  declare observations: string;




  static id = 9036;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Item_Mov_Units.getBaseTableModelFields(),...{                 
      item_mov_amt_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
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
      variable_unit_measure_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      variable_expected_amt:{
        type: DataTypes.DECIMAL(32,10)
      },
      variable_moved_amt:{
        type: DataTypes.DECIMAL(32,10)
      },
      observations:{
        type:DataTypes.TEXT
      }      
    }
  };
  
  static uniqueFields = [
    'item_mov_amt_id',
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
  ];

  static constraints = [...(Item_Mov_Units.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Mov_Units.tableName + '_u1',
      fields: [...Item_Mov_Units.getBaseTableModelUniqueFields(),...Item_Mov_Units.uniqueFields],
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
        fields: ['identifier_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
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
      result.push({
        fields: ['variable_unit_measure_id'],
        type: 'foreign key',
        references: { 
            table: Measurement_Units,
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