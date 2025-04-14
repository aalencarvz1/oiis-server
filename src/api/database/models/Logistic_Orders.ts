'use strict';

import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Identifier_Types  from "./Identifier_Types.js";
import  Movement_Status  from "./Movement_Status.js";
import  Logistic_Mov_Types  from "./Logistic_Mov_Types.js";
import  Action_Status  from "./Action_Status.js";
import  Logistic_Status  from "./Logistic_Status.js";
import  Logistic_Reasons  from "./Logistic_Reasons.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Logistic_Orders extends BaseTableModel {

  //table fields
  declare logistic_mov_type_id: number;
  declare identifier_type_id: number;
  declare identifier: string;
  declare action_status_id: number;
  declare logistic_status_id: number;
  declare unmoved_reason_id: number;
  declare collected_reason_id: number;
  declare unmoved_qty_notes: string;
  declare collected_qty_notes: string;
  declare mov_started_at: Date;
  declare mov_ended_at: Date;


  static id = 12003;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Logistic_Orders.getBaseTableModelFields(),...{           
      logistic_mov_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      },
      action_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      logistic_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
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
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
    }
  };
  
  static uniqueFields = [
    'logistic_mov_type_id',
    Sequelize.literal(`(COALESCE(identifier_type_id,0))`),
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
  ];

  static constraints = [...(Logistic_Orders.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders.tableName + '_u1',
      fields: [...Logistic_Orders.getBaseTableModelUniqueFields(),...Logistic_Orders.uniqueFields],
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
        fields: ['identifier_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
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
        fields: ['logistic_status_id'],
        type: 'foreign key',
        references: { 
            table: Logistic_Status,
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